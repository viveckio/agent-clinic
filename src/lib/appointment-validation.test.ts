import { describe, expect, it } from "vitest";
import { validateBookingInput } from "./appointment-validation";

describe("appointment form validation", () => {
  it("accepts a complete request and normalizes contact fields", () => {
    const result = validateBookingInput({
      agentName: "  Agent Fern  ",
      contactEmail: "  fern@example.test  ",
      careItemSlug: "context-drift",
      requestedAt: "2026-09-28T09:00:00.000Z",
    });

    expect(result.success).toBe(true);
    if (result.success) expect(result.data).toMatchObject({ agentName: "Agent Fern", contactEmail: "fern@example.test" });
  });

  it("rejects malformed names, contact addresses, and missing choices", () => {
    const result = validateBookingInput({
      agentName: "A",
      contactEmail: "not-an-email",
      careItemSlug: "",
      requestedAt: "next Tuesday",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.agentName).toBeDefined();
      expect(result.error.flatten().fieldErrors.contactEmail).toBeDefined();
      expect(result.error.flatten().fieldErrors.careItemSlug).toBeDefined();
      expect(result.error.flatten().fieldErrors.requestedAt).toBeDefined();
    }
  });
});
