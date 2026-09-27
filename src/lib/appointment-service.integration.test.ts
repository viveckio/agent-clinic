import { afterAll, describe, expect, it } from "vitest";
import { createAppointment, availableAppointmentSlots, changeAppointmentStatus } from "./appointment-service";
import { prisma } from "./prisma";

describe("appointment persistence and slot rules", () => {
  const email = "mvp-integration@example.test";

  afterAll(async () => {
    await prisma.appointment.deleteMany({ where: { contactEmail: email } });
    await prisma.$disconnect();
  });

  it("persists one request when simultaneous submissions claim the same slot", async () => {
    const [slot] = await availableAppointmentSlots();
    expect(slot).toBeDefined();
    const input = {
      agentName: "Integration Agent",
      contactEmail: email,
      careItemSlug: "context-drift",
      requestedAt: slot.value,
    };

    const [first, second] = await Promise.all([createAppointment(input), createAppointment(input)]);
    expect([first, second].filter((result) => result.ok)).toHaveLength(1);
    expect([first, second].filter((result) => !result.ok && result.reason === "slot-unavailable")).toHaveLength(1);

    const saved = await prisma.appointment.findMany({ where: { contactEmail: email }, include: { careItem: true } });
    expect(saved).toHaveLength(1);
    expect(saved[0].careItem.slug).toBe("context-drift");
    expect(saved[0].status).toBe("PENDING");
  });

  it("allows staff status changes and releases a cancelled slot", async () => {
    const saved = await prisma.appointment.findFirst({ where: { contactEmail: email } });
    expect(saved).toBeDefined();
    const confirm = await changeAppointmentStatus(saved!.id, "CONFIRMED");
    expect(confirm.ok).toBe(true);
    const cancel = await changeAppointmentStatus(saved!.id, "CANCELLED");
    expect(cancel.ok).toBe(true);
    expect(await changeAppointmentStatus(saved!.id, "CONFIRMED")).toMatchObject({ ok: false, reason: "invalid-transition" });

    const cancelled = await prisma.appointment.findUnique({ where: { id: saved!.id } });
    expect(cancelled?.status).toBe("CANCELLED");
    expect((await availableAppointmentSlots()).some((slot) => slot.value === saved!.requestedAt.toISOString())).toBe(true);
  });
});
