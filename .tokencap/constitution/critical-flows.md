# Critical Flows

> TokenCap Constitution Engine

## 🔴 CONST-FLOW-001 — CRITICAL

**Authentication Flow is repository-critical and must remain intact end-to-end.**

> **Why:** Every protected page and authenticated feature depends on this flow working correctly.

> **What breaks:** Users cannot log in. All authenticated features become unreachable. Sessions invalidated.

*Files:* `frontend/app/api/auth/login/route.ts`, `frontend/app/api/auth/logout/route.ts`, `frontend/app/api/auth/me/route.ts`, `frontend/app/api/auth/signup/route.ts`, `frontend/app/login/page.tsx`

## 🔴 CONST-FLOW-002 — CRITICAL

**Payment Flow is repository-critical. Checkout must complete reliably.**

> **Why:** Revenue depends entirely on the payment flow being operational and correct.

> **What breaks:** Users cannot complete purchases. Revenue stops. Potential chargebacks and disputes.

*Files:* `frontend/app/api/payments/route.ts`

## 🔴 CONST-FLOW-003 — CRITICAL

**User Registration Flow must remain functional. New users must be able to create accounts.**

> **Why:** Registration is the entry point for all new users. Breaking it stops user growth.

> **What breaks:** New users cannot create accounts. User acquisition blocked.

*Files:* `frontend/app/api/auth/signup/route.ts`, `frontend/app/signup/page.tsx`
