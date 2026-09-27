import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createAppointment: vi.fn(),
  revalidatePath: vi.fn(),
}));

vi.mock("@/lib/appointment-service", () => ({ createAppointment: mocks.createAppointment }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));

import { bookAppointment } from "@/app/actions/booking";

function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

describe("booking server action", () => {
  it("returns field errors without creating a record when input is invalid", async () => {
    const state = await bookAppointment({ status: "idle" }, form({
      agentName: "A",
      contactEmail: "bad",
      careItemSlug: "",
      requestedAt: "tomorrow",
    }));

    expect(state.status).toBe("error");
    expect(state.errors?.agentName).toBeDefined();
    expect(state.errors?.contactEmail).toBeDefined();
    expect(mocks.createAppointment).not.toHaveBeenCalled();
  });

  it("returns a pending request confirmation after persistence", async () => {
    mocks.createAppointment.mockResolvedValue({ ok: true, appointmentId: "request-12345678" });
    const state = await bookAppointment({ status: "idle" }, form({
      agentName: "Moss Agent",
      contactEmail: "moss@example.test",
      careItemSlug: "context-drift",
      requestedAt: "2026-09-28T09:00:00.000Z",
    }));

    expect(state.status).toBe("success");
    expect(state.appointmentId).toBe("request-12345678");
    expect(state.message).toContain("pending staff review");
    expect(mocks.createAppointment).toHaveBeenCalledOnce();
  });

  it("asks the visitor to choose another slot after an availability conflict", async () => {
    mocks.createAppointment.mockResolvedValue({ ok: false, reason: "slot-unavailable" });
    const state = await bookAppointment({ status: "idle" }, form({
      agentName: "Moss Agent",
      contactEmail: "moss@example.test",
      careItemSlug: "context-drift",
      requestedAt: "2026-09-28T09:00:00.000Z",
    }));

    expect(state.status).toBe("error");
    expect(state.message).toContain("Choose another time");
    expect(mocks.revalidatePath).toHaveBeenCalledWith("/book");
  });
});
