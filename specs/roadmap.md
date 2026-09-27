# AgentClinic Roadmap

Implementation proceeds in small, end-to-end phases. Each phase should leave a usable increment that can be reviewed before the next begins.

## Phase 1 — Establish the app

Create the Next.js, React, and TypeScript application, add the shared visual foundation, and establish responsive page structure.

**Done when:** the app runs locally and its basic shell works in modern desktop and mobile browser sizes.

**Status: Complete.** The Next.js app shell, initial placeholder page, responsive layout, shared style tokens, and local setup instructions are in place. TypeScript and the Webpack production build pass.

## Phase 2 — Introduce the clinic identity

Build the landing page with the clinic’s purpose, a clear tone, and navigation to care information.

**Done when:** a visitor can understand the service and reach its main sections.

**Status: Complete.** The landing page introduces AgentClinic's fictional agent-care purpose, provides responsive navigation and in-page care sections, and clearly indicates that appointment booking is coming in a later phase. Vitest, TypeScript, and the Webpack production build pass, and the landing page has been visually inspected at desktop and mobile sizes.

## Phase 3 — Explore ailments and therapies

Add an initial, curated catalogue of fictional agent ailments and individual detail views, alongside therapy information connected to relevant ailments.

**Done when:** visitors can browse ailments and therapies, read an ailment’s description and suggested next step, and understand relevant therapy options from either a therapy list or an ailment page.

**Status: Complete.** The curated ailment and therapy catalogues include connected list and detail views, suggested next steps, cross-links between relevant care, and a booking call to action for the upcoming booking phase. Vitest, TypeScript, and the Webpack production build pass, and the changes have been visually inspected.

## Phase 4 — Book an appointment

Add the appointment form, server-side validation, and durable appointment records in SQLite.

**Done when:** a visitor can submit a valid booking and receive a clear confirmation; invalid or unavailable requests receive useful feedback.

**Status: Complete.** Visitors can request a future weekday slot for an ailment or therapy, receive a pending-request confirmation, and get clear feedback for invalid or unavailable submissions. Zod validates server-side, SQLite persists requests through Prisma, and a database uniqueness rule handles concurrent slot claims. Vitest, TypeScript, Prisma schema validation, and the production build pass.

## Phase 5 — Give staff a working dashboard

Add staff access and a dashboard for reviewing and managing appointment requests.

**Done when:** authorized staff can find appointments and update their status, while unauthorized users cannot access staff actions.

**Status: Complete.** One deployment-configured staff account can sign in to a protected dashboard to search/filter requests and confirm or cancel them. Server actions verify the signed session before updates; unauthenticated dashboard requests redirect to sign-in. Credential, session-signature, status-transition, and authorization tests pass.

## Phase 6 — Prepare for launch

Configure the production environment, database setup, and operational basics; review accessibility, responsive behavior, and the main visitor and staff journeys.

**Done when:** the application can be deployed with documented configuration and the core journeys work in a modern browser.

**Status: Complete.** Provider-neutral operations documentation covers environment variables, SQLite migrations and seed data, persistent storage, single-instance assumptions, and backup/restore. The production build succeeds, the main booking and staff routes passed HTTP smoke checks, and the MVP test and type checks pass.

## Later increments

Use feedback to prioritize enhancements such as richer agent profiles, appointment notifications, search, or additional staff workflows. Keep each addition small and tied to a clear user need.
