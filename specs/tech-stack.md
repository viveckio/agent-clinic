# AgentClinic Technical Stack

## Stack decisions

- **Application:** Next.js with the App Router, React, and TypeScript.
- **Styling:** Tailwind CSS, with reusable components and shared design tokens.
- **Data store:** A local SQLite database for clinic, therapy, and appointment data.
- **Database access:** Prisma for schema management and typed queries, configured for SQLite.
- **Validation:** Zod for validating form input and data at application boundaries.
- **Test runner:** Vitest for automated validation of application behavior and data handling.
- **Deployment:** A platform that supports Next.js and persistent storage for the SQLite database file; document required environment variables and storage configuration.

## Why this stack

This is a widely used TypeScript-first web stack with server rendering and server-side functionality in one application. SQLite keeps local development and early deployment simple with a lightweight relational database, while Prisma and Zod keep data access and input handling explicit and typed.

## Engineering constraints

- Keep TypeScript strict and share types at application boundaries.
- Use Vitest for automated validation; keep tests focused on observable behavior and important data rules.
- Enforce appointment rules on the server; browser validation is for usability, not authority.
- Keep secrets and database credentials out of client code and version control.
- Use semantic HTML, keyboard-operable controls, and responsive layouts.
- Prefer simple, maintainable patterns; introduce separate services or infrastructure only when a concrete need appears.

## Initial scope

The first release can use a single Next.js application and a local SQLite database file. Keep the database location configurable and out of version control where it contains runtime data. Authentication, staff permissions, notifications, and operational details should be introduced when their roadmap phase requires them, rather than assumed in the public browsing flow.
