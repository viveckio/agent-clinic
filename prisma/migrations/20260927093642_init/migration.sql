-- CreateTable
CREATE TABLE "CareItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "agentName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "requestedAt" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "careItemId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Appointment_careItemId_fkey" FOREIGN KEY ("careItemId") REFERENCES "CareItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "CareItem_slug_key" ON "CareItem"("slug");

-- CreateIndex
CREATE INDEX "Appointment_requestedAt_idx" ON "Appointment"("requestedAt");

-- CreateIndex
CREATE INDEX "Appointment_status_requestedAt_idx" ON "Appointment"("status", "requestedAt");

-- CreateIndex
CREATE INDEX "Appointment_careItemId_idx" ON "Appointment"("careItemId");

-- A pending or confirmed request reserves its time. Cancellation releases it.
CREATE UNIQUE INDEX "Appointment_active_requestedAt_key"
ON "Appointment"("requestedAt")
WHERE "status" IN ('PENDING', 'CONFIRMED');

-- Keep valid statuses and transitions enforced even if another writer bypasses the app.
CREATE TRIGGER "Appointment_status_valid_insert"
BEFORE INSERT ON "Appointment"
WHEN NEW."status" NOT IN ('PENDING', 'CONFIRMED', 'CANCELLED')
BEGIN
  SELECT RAISE(ABORT, 'Invalid appointment status');
END;

CREATE TRIGGER "Appointment_status_transition"
BEFORE UPDATE OF "status" ON "Appointment"
WHEN NOT (
  NEW."status" = OLD."status"
  OR (OLD."status" = 'PENDING' AND NEW."status" IN ('CONFIRMED', 'CANCELLED'))
  OR (OLD."status" = 'CONFIRMED' AND NEW."status" = 'CANCELLED')
)
BEGIN
  SELECT RAISE(ABORT, 'Invalid appointment status transition');
END;
