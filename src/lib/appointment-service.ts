import "server-only";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { generateBookableSlots, type AvailableSlot } from "@/lib/appointment-time";
import type { BookingInput } from "@/lib/appointment-validation";

export type CreateAppointmentResult =
  | { ok: true; appointmentId: string }
  | { ok: false; reason: "slot-unavailable" | "care-item-unavailable" };

export async function availableAppointmentSlots(now = new Date()): Promise<AvailableSlot[]> {
  const slots = generateBookableSlots(now);
  if (slots.length === 0) return [];

  const reserved = await prisma.appointment.findMany({
    where: {
      status: { in: ["PENDING", "CONFIRMED"] },
      requestedAt: { in: slots.map((slot) => new Date(slot.value)) },
    },
    select: { requestedAt: true },
  });
  const reservedTimes = new Set(reserved.map((appointment) => appointment.requestedAt.toISOString()));
  return slots.filter((slot) => !reservedTimes.has(slot.value));
}

export async function createAppointment(input: BookingInput): Promise<CreateAppointmentResult> {
  const careItem = await prisma.careItem.findUnique({ where: { slug: input.careItemSlug } });
  if (!careItem) return { ok: false, reason: "care-item-unavailable" };

  const requestedAt = new Date(input.requestedAt);
  if (!generateBookableSlots().some((slot) => slot.value === requestedAt.toISOString())) {
    return { ok: false, reason: "slot-unavailable" };
  }

  const occupied = await prisma.appointment.findFirst({
    where: { requestedAt, status: { in: ["PENDING", "CONFIRMED"] } },
    select: { id: true },
  });
  if (occupied) return { ok: false, reason: "slot-unavailable" };

  try {
    const appointment = await prisma.appointment.create({
      data: {
        agentName: input.agentName,
        contactEmail: input.contactEmail,
        requestedAt,
        careItemId: careItem.id,
      },
    });
    return { ok: true, appointmentId: appointment.id };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { ok: false, reason: "slot-unavailable" };
    }
    throw error;
  }
}

export async function listAppointments(options: {
  query?: string;
  status?: string;
  from?: Date;
  to?: Date;
} = {}) {
  const q = options.query?.trim();
  const rows = await prisma.appointment.findMany({
    where: {
      ...(options.status && options.status !== "ALL" ? { status: options.status } : {}),
      ...(options.from || options.to ? { requestedAt: { ...(options.from ? { gte: options.from } : {}), ...(options.to ? { lte: options.to } : {}) } } : {}),
      ...(q ? {
        OR: [
          { agentName: { contains: q } },
          { contactEmail: { contains: q } },
          { careItem: { name: { contains: q } } },
        ],
      } : {}),
    },
    include: { careItem: true },
    orderBy: [{ createdAt: "desc" }],
    take: 100,
  });
  return rows.sort((a, b) => {
    const statusOrder = { PENDING: 0, CONFIRMED: 1, CANCELLED: 2 } as const;
    const aOrder = statusOrder[a.status as keyof typeof statusOrder] ?? 3;
    const bOrder = statusOrder[b.status as keyof typeof statusOrder] ?? 3;
    return aOrder - bOrder || a.requestedAt.getTime() - b.requestedAt.getTime();
  });
}

export async function changeAppointmentStatus(id: string, status: "CONFIRMED" | "CANCELLED") {
  const appointment = await prisma.appointment.findUnique({ where: { id }, select: { id: true, status: true } });
  if (!appointment) return { ok: false as const, reason: "not-found" as const };
  if (appointment.status === status) return { ok: true as const };
  const permittedPreviousStatus = status === "CONFIRMED" ? "PENDING" : { in: ["PENDING", "CONFIRMED"] };
  const updated = await prisma.appointment.updateMany({
    where: { id, status: permittedPreviousStatus },
    data: { status },
  });
  if (updated.count === 1) return { ok: true as const };
  const latest = await prisma.appointment.findUnique({ where: { id }, select: { id: true } });
  return latest
    ? { ok: false as const, reason: "invalid-transition" as const }
    : { ok: false as const, reason: "not-found" as const };
}
