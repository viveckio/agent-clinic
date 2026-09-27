# AgentClinic Roadmap

Implementation proceeds in small, end-to-end phases. Each phase should leave a usable increment that can be reviewed before the next begins.

## Phase 1 — Establish the app

Create the Next.js, React, and TypeScript application, add the shared visual foundation, and establish responsive page structure.

**Done when:** the app runs locally and its basic shell works in modern desktop and mobile browser sizes.

## Phase 2 — Introduce the clinic identity

Build the landing page with the clinic’s purpose, a clear tone, and navigation to care information.

**Done when:** a visitor can understand the service and reach its main sections.

## Phase 3 — Browse ailments

Add an initial, curated catalogue of fictional agent ailments and individual detail views.

**Done when:** visitors can browse the catalogue and read an ailment’s description and suggested next step.

## Phase 4 — Browse therapies

Add therapy information and connect relevant therapies to ailment details.

**Done when:** visitors can understand available options from either the therapy list or an ailment page.

## Phase 5 — Book an appointment

Add the appointment form, server-side validation, and durable appointment records in PostgreSQL.

**Done when:** a visitor can submit a valid booking and receive a clear confirmation; invalid or unavailable requests receive useful feedback.

## Phase 6 — Give staff a working dashboard

Add staff access and a dashboard for reviewing and managing appointment requests.

**Done when:** authorized staff can find appointments and update their status, while unauthorized users cannot access staff actions.

## Phase 7 — Prepare for launch

Configure the production environment, database setup, and operational basics; review accessibility, responsive behavior, and the main visitor and staff journeys.

**Done when:** the application can be deployed with documented configuration and the core journeys work in a modern browser.

## Later increments

Use feedback to prioritize enhancements such as richer agent profiles, appointment notifications, search, or additional staff workflows. Keep each addition small and tied to a clear user need.
