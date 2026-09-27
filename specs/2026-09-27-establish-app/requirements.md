# Requirements: Establish the app

## Scope

Deliver the first usable application increment: a Next.js, React, and TypeScript app with a shared visual foundation and responsive page structure. The roadmap defines completion as a locally runnable app whose basic shell works at modern desktop and mobile sizes.

This phase establishes the foundation for later clinic features. The clinic identity, ailment and therapy catalogues, booking flow, staff access, and production launch work remain in their later roadmap phases unless the feature owner explicitly adjusts the scope.

## Guidance and context

- Follow `specs/mission.md`: treat agents with care, make the next step clear, be dependable and accessible, and grow in small reviewable increments.
- Follow `specs/tech-stack.md`: Next.js App Router, React, strict TypeScript, Tailwind CSS, reusable components, and shared design tokens.
- Preserve the product boundary: AgentClinic provides informational support for fictional agent ailments and must not imply human medical diagnosis or treatment.
- Keep the initial shell semantic, keyboard operable, and responsive.

## Decisions to confirm

## Confirmed decisions

- **Initial page content:** Keep the first page a neutral placeholder. Avoid clinic marketing copy or a developed brand identity; those belong to Phase 2.
- **Browser baseline:** Support modern browsers only: current stable evergreen desktop browsers and their current mobile counterparts. Do not add legacy browser support.
- **Visual direction:** Use a restrained, neutral foundation suitable for a placeholder. Final clinic colors, typography, and brand assets can be established with the clinic identity in Phase 2.
- **Project setup:** Retain the repository's existing package manager and configuration where practical, updating them as needed for the agreed stack.

## Out of scope for this phase

- Production clinic copy and navigation to care information (Phase 2).
- Ailment and therapy catalogues (Phases 3–4).
- Appointment persistence, authentication, and staff workflows (Phases 5–6).
- Production deployment setup and launch review (Phase 7).
