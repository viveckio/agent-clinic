# Validation and merge criteria

The MVP is ready to merge when all of the following are true:

- A visitor can submit a valid appointment request for an available future slot and receive a clear pending-request confirmation.
- Invalid inputs, past requests, and duplicate/unavailable slots receive useful feedback; server validation remains authoritative.
- Valid bookings persist across app restarts in the configured SQLite database.
- Staff can sign in using deployment-configured credentials; missing or invalid credentials do not expose staff actions.
- Unauthenticated requests cannot view appointments or update their status.
- Authorized staff can search/filter requests, confirm or cancel them, and see persisted status changes; cancelled slots become available again.
- Appointment state and schedule rules are enforced safely under concurrent requests.
- Public care, booking, confirmation, staff sign-in, dashboard, and status-update pages remain semantic, keyboard-operable, responsive, and usable in modern desktop and mobile browsers.
- Vitest covers input validation, slot conflicts, persistence, access control, and status transitions; the test suite passes.
- TypeScript checks and the supported production build pass.
- Provider-neutral setup documentation covers environment variables, persistent SQLite storage, migration/seed, and backup/restore. Secrets and runtime data are not committed.
- Roadmap Phases 4–6 are marked complete only after their “Done when” statements are met and the full journey has been visually reviewed.
