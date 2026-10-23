// ============================================================
// Agri-Share – MySQL 8.0 Database Connection Pool (Server-Side)
// Uses mysql2/promise with connection pooling.
// ============================================================

import mysql, { Pool, PoolOptions, RowDataPacket, ResultSetHeader } from 'mysql2/promise';

let pool: Pool | null = null;

export function getDbPool(): Pool {
  if (!pool) {
    const config: PoolOptions = {
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'agri_share',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    };

    pool = mysql.createPool(config);
  }
  return pool;
}

/**
 * Execute a parameterized SQL query safely.
 * @param sql The SQL query string with ? placeholders.
 * @param params Query parameters to safely bind.
 */
export type QueryParam = string | number | boolean | Date | Buffer | null | undefined;

export async function query<T = RowDataPacket[]>(
  sql: string,
  params: QueryParam[] = []
): Promise<T> {
  const p = getDbPool();
  try {
    const [rows] = await p.execute(sql, params as (string | number | boolean | Date | Buffer | null)[]);
    return rows as T;
  } catch (error: unknown) {
    const err = error as { code?: string; message?: string };
    if (err.code === 'ECONNREFUSED') {
      throw new Error(
        'Database connection refused. Ensure MySQL 8.0 is running on ' +
        (process.env.DB_HOST || '127.0.0.1') + ':' + (process.env.DB_PORT || 3306) +
        ' and credentials in .env.local are correct.'
      );
    }
    if (err.code === 'ER_BAD_DB_ERROR') {
      throw new Error(
        'Database "agri_share" not found. Please run database/schema.sql in MySQL Workbench first.'
      );
    }
    throw error;
  }
}

/**
 * Type helper for INSERT / UPDATE / DELETE operations.
 */
export type DbResult = ResultSetHeader;
