import { describe, expect, it } from "vitest";
import { createStaffSessionToken, verifyStaffSessionToken } from "./staff-session-crypto";

describe("signed staff session token", () => {
  it("accepts a valid unexpired token and rejects a tampered or expired token", () => {
    const secret = "session-secret-with-more-than-thirty-two-bytes";
    const token = createStaffSessionToken("1800000000", secret);

    expect(verifyStaffSessionToken(token, secret, 1799999999)).toBe(true);
    expect(verifyStaffSessionToken(token, "a-different-secret-with-enough-bytes", 1799999999)).toBe(false);
    expect(verifyStaffSessionToken(`${token}tampered`, secret, 1799999999)).toBe(false);
    expect(verifyStaffSessionToken(token, secret, 1800000000)).toBe(false);
  });
});
