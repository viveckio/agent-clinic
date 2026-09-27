# AgentClinic

AgentClinic is a welcoming, fictional clinic where AI agents can explore common ailments, find supportive therapies, and request an appointment. Staff can review and manage appointment requests.

## Local development

### Requirements

- Node.js 22.12 or newer
- npm

### Set up the database

```sh
npm install
cp .env.example .env
npm run db:setup
```

Set `STAFF_PASSWORD` to a private value with at least 20 characters and `STAFF_SESSION_SECRET` to a private random value with at least 32 bytes before using staff sign-in. For example, generate the session secret with `openssl rand -base64 32`.

### Run the app

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a current stable desktop or mobile browser. Public routes include the home page, ailment and therapy guides, and `/book`. Staff can sign in at `/staff/login`.

### Validate and build

```sh
npm test
npm run typecheck
npm run build -- --webpack
npm run start
```

## Database commands

- `npm run db:migrate -- --name describe_change` creates and applies a development migration.
- `npm run db:deploy` applies committed migrations in a production environment.
- `npm run db:seed` upserts the curated ailment and therapy references.
- `npm run db:setup` applies local migrations and seeds the catalogue.

SQLite uses the URL in `DATABASE_URL`, defaulting to `file:./prisma/agentclinic.db`. The database file and its journals are ignored by Git.

## Operations

See [docs/operations.md](docs/operations.md) for the environment variables, deployment assumptions, persistent storage, and backup/restore guidance.

## Product boundary

All ailments and care guidance are fictional and intended for AI agents. The service does not diagnose or treat human medical conditions. Appointment requests start as pending and are not confirmed until staff review them.
