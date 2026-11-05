# Security Boundaries

> TokenCap Constitution Engine

## 🔴 CONST-SEC-001 — CRITICAL

**Environment secrets must never be hardcoded in source files.**

> **Why:** Secrets committed to source are exposed via version control history and repository access.

> **What breaks:** Security breach. API keys, database credentials, and tokens compromised.

*Files:* `frontend/lib/auth.ts`, `frontend/lib/db.ts`
