# MVP implementation plan

Phases 1–3 are already complete. This plan completes the remaining appointment, staff, and launch phases as one reviewable MVP increment.

## 1. Reconcile the application foundation

1.1 [x] Review current App Router conventions, existing catalogue routes, and installed Next.js documentation.

1.2 [x] Align the Phase 4 roadmap wording with the approved SQLite decision in `specs/tech-stack.md`.

1.3 [x] Add Prisma, Zod, and the necessary SQLite runtime dependencies and configuration.

## 2. Persist clinic and appointment data

2.1 [x] Define Prisma models for the curated ailment/therapy references, appointments, and appointment status.

2.2 [x] Add database initialization and idempotent seed data for the existing curated catalogue.

2.3 [x] Enforce active-slot uniqueness and appointment status transitions in SQLite and the server-side service layer.

## 3. Complete public appointment booking

3.1 [x] Replace the disabled booking call to action with an accessible booking route and form.

3.2 [x] Validate contact details, selected ailment or therapy, and requested appointment time with Zod on the server.

3.3 [x] Offer weekday slots in the configured clinic timezone; reject past, duplicate, and unavailable slots.

3.4 [x] Persist valid bookings as pending and show a clear confirmation; show field-level and availability errors.

## 4. Add staff sign-in and appointment dashboard

4.1 [x] Implement one deployment-configured staff account with constant-time credential checks and an expiring signed, HttpOnly, SameSite session cookie.

4.2 [x] Protect the dashboard and every status mutation on the server; reject unauthenticated access and invalid state changes.

4.3 [x] List, search, and filter appointments by status and date, with a useful empty state.

4.4 [x] Let authorized staff confirm or cancel requests and persist the status change.

## 5. Prepare provider-neutral launch operations

5.1 [x] Document required environment variables, SQLite path, local setup, schema migration, and seed commands.

5.2 [x] Document persistent-volume requirements, the single-instance MVP assumption, and backup/restore steps.

5.3 [x] Disable staff sign-in when required secrets are missing, ignore runtime database files, and document secret handling.

## 6. Validate the complete MVP journey

6.1 [x] Add Vitest coverage for validation, availability conflicts, SQLite persistence, staff credentials/session signatures, authorization, and status transitions.

6.2 [x] Vitest passes (24 tests across 11 files), TypeScript checks pass, and the production Webpack build passes. Prisma schema validation and the production dependency audit also pass.

6.3 [x] Review semantic form/dashboard markup and responsive breakpoints; production HTTP smoke checks returned 200 for `/book` and `/staff/login`, and 307 from unauthenticated `/staff` to sign-in.

6.4 [x] Mark roadmap Phases 4–6 complete after their stated criteria passed.
