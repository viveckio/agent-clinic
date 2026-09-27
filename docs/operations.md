# MVP operations guide

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | No | Prisma SQLite URL; defaults to `file:./prisma/agentclinic.db`. Point this at a persistent writable file location in deployment. |
| `CLINIC_TIME_ZONE` | No | IANA timezone for weekday hours and displayed appointment times; defaults to `UTC`. |
| `STAFF_USERNAME` | Yes for staff access | Username for the single staff account. |
| `STAFF_PASSWORD` | Yes for staff access | Private password with at least 20 characters. Generate a unique value and store it in the hosting platform's secret manager. |
| `STAFF_SESSION_SECRET` | Yes for staff access | HMAC key with at least 32 bytes. Generate with `openssl rand -base64 32`; do not reuse the password. |

Copy `.env.example` to `.env` for local development, then replace the staff placeholders. Never commit `.env` or put these secrets in client-side variables.

## First deployment

1. Use a Node.js host that supports a long-running Next.js application and a durable writable disk.
2. Attach one persistent volume and set `DATABASE_URL` to a SQLite file on that volume.
3. Configure the staff username, long unique password, session secret, and clinic timezone as server-side environment variables.
4. Install dependencies and build the Next.js application with production dependencies available during the build so Prisma Client can be generated.
5. Run `npm run db:deploy`, then `npm run db:seed` against the persistent database before routing traffic to the application.
6. Start one application instance with `npm run start` and verify public booking plus staff sign-in over HTTPS.

This MVP expects one application instance using one local SQLite file. Hosts with ephemeral filesystems or horizontally scaled instances without shared transactional SQLite storage are not suitable for this configuration. Choose a host with durable local storage; the roadmap can move to a server database if the service later needs multi-instance scaling.

Staff sessions last eight hours. Cookies are HttpOnly and SameSite strict, and Secure in production. The first release has one shared staff account and no self-service account recovery; rotate the staff password and session secret through the deployment secret manager if access needs to be revoked.

## Migrations and seed data

Create schema changes locally with `npm run db:migrate -- --name describe_change`, review and commit the migration under `prisma/migrations`, and apply committed changes in deployment with `npm run db:deploy`. Run `npm run db:seed` after the first migration and after adding new curated care entries. Seeding is idempotent and updates catalogue names without changing appointment records.

Do not delete or regenerate migrations that have been applied to a persistent deployment database.

## Backups and restore

Back up the SQLite database file on the persistent volume on a regular schedule. For a simple maintenance window, stop the application before copying `prisma/agentclinic.db`; also include any `-wal` and `-shm` files if present. Store backups encrypted and separately from the app host. To restore, stop the app, replace the database file with the selected backup, ensure its directory ownership allows the application to write, then restart and verify the dashboard and booking availability.

For a live backup, use SQLite's online backup command rather than copying a file while it is being written:

```sh
sqlite3 "$SQLITE_DATABASE_FILE" ".backup '$SQLITE_BACKUP_FILE'"
```

Set `SQLITE_DATABASE_FILE` and `SQLITE_BACKUP_FILE` to the actual paths in the host's backup job; do not store backup files in the public web root or Git repository.

## MVP operating limits

- Appointment times are generated on weekdays from 9:00 am through 4:30 pm, in 30-minute intervals, for the next 14 calendar days in `CLINIC_TIME_ZONE`.
- Pending and confirmed requests reserve a slot. Cancelling a request releases it.
- Submitting a request does not confirm it. Staff must review and confirm it.
- The system does not send email, text messages, or reminders.
- Do not collect or enter human medical information. The clinic content is fictional support for AI agents.
