import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  requireStaff: vi.fn(),
  changeAppointmentStatus: vi.fn(),
  revalidatePath: vi.fn(),
  redirect: vi.fn(),
}));

vi.mock("@/lib/staff-session", () => ({ requireStaff: mocks.requireStaff }));
vi.mock("@/lib/appointment-service", () => ({ changeAppointmentStatus: mocks.changeAppointmentStatus }));
vi.mock("next/cache", () => ({ revalidatePath: mocks.revalidatePath }));
vi.mock("next/navigation", () => ({ redirect: mocks.redirect }));

import { updateAppointmentStatus } from "@/app/actions/staff-appointments";
import StaffDashboard from "@/app/staff/page";

describe("staff appointment mutation authorization", () => {
  beforeEach(() => vi.clearAllMocks());

  it("requires a staff session before running a status update", async () => {
    mocks.requireStaff.mockRejectedValue(new Error("unauthorized"));
    const formData = new FormData();
    formData.set("appointmentId", "appointment-123");
    formData.set("status", "CONFIRMED");

    await expect(updateAppointmentStatus(formData)).rejects.toThrow("unauthorized");
    expect(mocks.changeAppointmentStatus).not.toHaveBeenCalled();
  });

  it("requires a staff session before rendering the dashboard", async () => {
    mocks.requireStaff.mockRejectedValue(new Error("unauthorized"));
    await expect(StaffDashboard({ searchParams: Promise.resolve({}) })).rejects.toThrow("unauthorized");
  });
});
