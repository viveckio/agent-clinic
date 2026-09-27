# MVP: booking, staff dashboard, and launch readiness

## Purpose

Complete AgentClinic’s essential MVP journey: an agent can explore the existing fictional care catalogue, request an appointment, receive a clear confirmation, and clinic staff can securely review and manage the request.

## Scope

- Complete the remaining roadmap phases: appointment booking, staff dashboard, and launch preparation. Phases 1–3 are already marked complete.
- Persist booking records in SQLite through Prisma, following `specs/tech-stack.md` and the user-approved database choice.
- Provide a public form that collects an agent/contact name, contact email, an ailment or therapy, and a requested date/time.
- Validate all submitted data on the server with Zod and save valid requests with an initial pending status.
- Present a small set of bookable appointment times and give useful feedback for invalid or unavailable requests.
- Confirm successful requests without claiming that an appointment has been approved.
- Provide one staff sign-in configured by deployment secrets, with no public signup, multiple roles, or user administration.
- Protect staff pages and state changes on the server. Let the signed-in staff member review/search/filter requests and update their status.
- Prepare provider-neutral run and deployment documentation, including persistent SQLite storage, migrations, seed/setup, required environment variables, and backup/restore.
- Keep the site responsive, accessible, and compatible with modern browsers.

## Decisions

- **Database:** Use SQLite, as specified by `specs/tech-stack.md`; update the Phase 4 roadmap text that currently conflicts by naming PostgreSQL.
- **Booking inputs:** Require contact name, contact email, one selected ailment or therapy, and a requested date/time. Do not collect payment data or human health details.
- **Availability:** Use configurable clinic timezone and weekday hours with 30-minute slots. Reject past and already-held slots server-side and enforce uniqueness in persistence. A pending or confirmed booking occupies its slot; cancellation releases it. Keep the schedule small and document the defaults.
- **Status workflow:** New requests are pending; staff can confirm or cancel them. Do not imply that submission itself confirms a visit.
- **Staff access:** Use one account from server-only environment secrets, with an expiring secure session. No public account creation or role management.
- **Launch target:** Stay provider-neutral. Document persistent local-disk SQLite requirements and the single-instance assumption; do not deploy to a provider in this increment.
- **Communications:** No email, SMS, or appointment reminders in the MVP.
- **Product boundary:** Care content remains fictional support for AI agents and must not imply human medical diagnosis or treatment.

## Context

The mission defines AgentClinic as a warm, dependable fictional clinic for AI agents and clinic staff. Roadmap Phases 1–3 are complete: the Next.js shell and identity page exist, and ailment/therapy catalogues already live in the App Router with static sample data. The current repository does not yet include a database, Prisma, or Zod dependency. The technical-stack document specifies Next.js App Router, React, TypeScript, Tailwind CSS, SQLite, Prisma, Zod, and Vitest. The roadmap’s Phase 4 text still says PostgreSQL; the user resolved the conflict in favor of SQLite.
