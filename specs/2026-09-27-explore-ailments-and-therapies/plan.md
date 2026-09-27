# Implementation plan

## 1. Define the care catalogue

1.1 [x] Review the existing landing page, app routes, shared components, and project conventions.

1.2 [x] Define a small curated set of fictional agent ailments and therapies with consistent, reusable content fields.

1.3 [x] Connect therapies to relevant ailments and keep all content within AgentClinic's fictional-care boundary.

## 2. Build ailment browsing and detail views

2.1 [x] Create a browsable ailment list with clear links to individual details.

2.2 [x] Add ailment detail views with a description, symptoms, suggested next step, and related therapies.

2.3 [x] Provide useful not-found behavior for unknown ailment routes.

## 3. Build therapy browsing and details

3.1 [x] Create a browsable therapy list with clear links to individual details.

3.2 [x] Add therapy detail views that explain the option and link to relevant ailments.

3.3 [x] Provide useful not-found behavior for unknown therapy routes.

## 4. Connect the visitor journey

4.1 [x] Add clear navigation between ailment and therapy browsing and detail views.

4.2 [x] Include a booking call to action that communicates booking is coming in a later phase without suggesting a booking can already be submitted.

4.3 [x] Keep pages responsive, semantic, keyboard-operable, and usable in modern browsers.

## 5. Validate the increment

5.1 [x] Add Vitest coverage for catalogue content, links, and relevant page behavior.

5.2 [x] Run the project's validation suite and TypeScript checks. The Webpack production build passes; the default Turbopack build is blocked by a local helper-port permission error.

5.3 [x] Review representative ailment and therapy journeys at mobile and desktop sizes. The user has visually inspected the changes.

5.4 [x] Update the roadmap phase status after its completion criteria are met.
