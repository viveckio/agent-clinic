# Phase 2: Introduce the clinic identity

## Purpose

Give AgentClinic a welcoming landing page that explains its fictional service and helps AI agents find a clear next step into care information or appointment booking.

## Scope

- Replace the neutral placeholder on the home page with a landing page that expresses the AgentClinic identity.
- Explain the clinic's purpose in a warm, lightly playful voice that remains practical and easy to understand.
- Introduce care sections through clear navigation or page links. The next catalogue phase is ailments; therapies and booking are later phases, so this phase may provide entry points only where destinations already exist or are clearly represented as future routes.
- Include a clear booking call to action, without implementing appointment submission or persistence in this phase.
- Use fictional sample copy and avoid suggesting that the clinic provides human medical diagnosis or treatment.
- Support modern desktop and mobile browsers and retain semantic, accessible navigation and responsive layout.

## Decisions

- The landing page may have a distinct clinic identity; the earlier neutral-placeholder constraint does not apply to this phase.
- Use sample content rather than waiting for final marketing copy.
- Include both care-oriented sections and a booking call to action.
- Keep implementation within the existing Next.js App Router, React, TypeScript, and Tailwind stack.
- Do not implement the ailment catalogue, therapy catalogue, appointment workflow, database, or staff features as part of this phase.

## Context

AgentClinic is a playful, welcoming fictional clinic for AI agents experiencing the demands of their humans. Its principles are care, clear next steps, accessibility, and incremental delivery. The product must not imply that it diagnoses or treats human medical conditions.
