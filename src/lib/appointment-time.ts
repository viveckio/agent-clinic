export type AvailableSlot = {
  value: string;
  dateKey: string;
  dateLabel: string;
  timeLabel: string;
};

export const CLINIC_TIME_ZONE = process.env.CLINIC_TIME_ZONE || "UTC";
export const BOOKING_WINDOW_DAYS = 14;

type WallTime = { year: number; month: number; day: number; hour: number; minute: number };

function partsAt(date: Date, timeZone: string): WallTime {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
    hour: Number(values.hour),
    minute: Number(values.minute),
  };
}

function wallClockToUtc(wall: WallTime, timeZone: string): Date | undefined {
  const target = Date.UTC(wall.year, wall.month - 1, wall.day, wall.hour, wall.minute);
  let guess = target;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const actual = partsAt(new Date(guess), timeZone);
    const actualAsUtc = Date.UTC(actual.year, actual.month - 1, actual.day, actual.hour, actual.minute);
    guess += target - actualAsUtc;
  }

  const result = new Date(guess);
  const verified = partsAt(result, timeZone);
  if (
    verified.year !== wall.year || verified.month !== wall.month || verified.day !== wall.day ||
    verified.hour !== wall.hour || verified.minute !== wall.minute
  ) return undefined;
  return result;
}

function dateLabel(dateKey: string, timeZone: string): string {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = wallClockToUtc({ year, month, day, hour: 12, minute: 0 }, timeZone);
  if (!date) return dateKey;
  return new Intl.DateTimeFormat("en-US", { timeZone, weekday: "long", month: "long", day: "numeric" }).format(date);
}

export function generateBookableSlots(now = new Date(), timeZone = CLINIC_TIME_ZONE): AvailableSlot[] {
  const today = partsAt(now, timeZone);
  const slots: AvailableSlot[] = [];
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });

  for (let dayOffset = 0; dayOffset < BOOKING_WINDOW_DAYS; dayOffset += 1) {
    const date = new Date(Date.UTC(today.year, today.month - 1, today.day + dayOffset));
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const weekday = date.getUTCDay();
    if (weekday === 0 || weekday === 6) continue;

    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    for (let minutes = 9 * 60; minutes < 17 * 60; minutes += 30) {
      const slot = wallClockToUtc({ year, month, day, hour: Math.floor(minutes / 60), minute: minutes % 60 }, timeZone);
      if (!slot || slot <= now) continue;
      slots.push({
        value: slot.toISOString(),
        dateKey,
        dateLabel: dateLabel(dateKey, timeZone),
        timeLabel: timeFormatter.format(slot),
      });
    }
  }
  return slots;
}

export function isBookableSlot(value: string, now = new Date(), timeZone = CLINIC_TIME_ZONE): boolean {
  return generateBookableSlots(now, timeZone).some((slot) => slot.value === value);
}

export function formatClinicDateTime(date: Date, timeZone = CLINIC_TIME_ZONE) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(date);
}

export function clinicDayRange(dateKey: string, timeZone = CLINIC_TIME_ZONE) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) return undefined;
  const [, year, month, day] = match.map(Number);
  const from = wallClockToUtc({ year, month, day, hour: 0, minute: 0 }, timeZone);
  const nextDate = new Date(Date.UTC(year, month - 1, day + 1));
  const to = wallClockToUtc({ year: nextDate.getUTCFullYear(), month: nextDate.getUTCMonth() + 1, day: nextDate.getUTCDate(), hour: 0, minute: 0 }, timeZone);
  return from && to ? { from, to: new Date(to.getTime() - 1) } : undefined;
}
