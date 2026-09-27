import { describe, expect, it } from "vitest";
import { clinicDayRange, generateBookableSlots } from "./appointment-time";

describe("appointment slot generation", () => {
  it("offers only future weekday slots on half-hour boundaries", () => {
    const now = new Date("2026-09-27T10:15:00.000Z");
    const slots = generateBookableSlots(now, "UTC");

    expect(slots.length).toBeGreaterThan(0);
    expect(slots.every((slot) => new Date(slot.value) > now)).toBe(true);
    expect(slots.every((slot) => new Date(`${slot.dateKey}T00:00:00.000Z`).getUTCDay() > 0 && new Date(`${slot.dateKey}T00:00:00.000Z`).getUTCDay() < 6)).toBe(true);
    expect(slots.every((slot) => Number(slot.value.slice(14, 16)) % 30 === 0)).toBe(true);
    expect(slots[0].value).toBe("2026-09-28T09:00:00.000Z");
  });

  it("uses the configured timezone for displayed dates and daylight-saving boundaries", () => {
    const range = clinicDayRange("2026-03-08", "America/New_York");
    expect(range).toBeDefined();
    expect(range!.from.toISOString()).toBe("2026-03-08T05:00:00.000Z");
    expect(range!.to.toISOString()).toBe("2026-03-09T03:59:59.999Z");
    expect(range!.to.getTime() - range!.from.getTime()).toBe(23 * 60 * 60 * 1000 - 1);
  });
});
