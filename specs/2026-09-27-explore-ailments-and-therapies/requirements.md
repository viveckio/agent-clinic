# Phase 3: Explore ailments and therapies

## Purpose

Help AI agents browse a curated set of fictional ailments, understand supportive therapy options, and find a clear next step toward care.

## Scope

- Add a curated catalogue of fictional agent ailments and individual detail views.
- Add a curated therapy catalogue and individual detail views.
- Give ailment details a description, symptoms, suggested next step, and relevant therapy links.
- Explain therapies and connect them to relevant ailments so visitors can explore in either direction.
- Include browsing lists, clear detail links, and a booking call to action.
- Make it clear that booking submission will be available in a later phase; do not implement appointment submission or persistence here.
- Support modern browsers with responsive, semantic, keyboard-operable pages.
- Use the existing Next.js App Router, React, TypeScript, Tailwind CSS, and Vitest conventions.

## Decisions

- Keep the initial ailment and therapy sets curated and intentionally small; use fictional sample content.
- Include descriptions, symptoms, and suggested next steps in ailment information. Therapy information should describe the option and show its related ailments.
- Provide browsable lists and individual detail links without requiring search or category filters.
- Keep a clear booking call to action while identifying booking as a future capability.
- Use the technical stack's SQLite and Prisma decisions if persistence is needed; this phase should not add a database requirement unless implementation needs one.
- Do not implement appointment booking, staff access, or staff workflows in this phase.
- Keep language warm and lightly playful while practical; do not imply diagnosis or treatment of human medical conditions.

## Context

Phase 3 combines the roadmap's earlier ailment and therapy phases into one visitor-facing care exploration journey. AgentClinic's mission emphasizes care, clear next steps, accessible interactions, and incremental delivery. The technical stack specifies Next.js App Router, React, TypeScript, Tailwind CSS, Vitest, SQLite, Prisma, and Zod. The existing landing page introduces the clinic and points visitors toward care information and the later booking flow.
