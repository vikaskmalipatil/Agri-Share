-- ============================================================
-- AGRI-SHARE: FRESH DATABASE RESET SCRIPT
-- Platform: MySQL 8.0 | Engine: InnoDB
--
-- PURPOSE: Completely destroys and recreates the agri_share
-- database. Run this ONLY when starting from scratch.
--
-- WARNING: ALL DATA WILL BE PERMANENTLY DELETED.
--
-- HOW TO USE (MySQL Workbench):
--   1. Open this file: File > Open SQL Script
--   2. Execute: Ctrl+Shift+Enter (or the lightning bolt icon)
--   3. Then run schema.sql, then seeds.sql
-- ============================================================

DROP DATABASE IF EXISTS `agri_share`;
