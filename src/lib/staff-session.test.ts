import { afterEach, describe, expect, it } from "vitest";
import { staffCredentialsAreConfigured, verifyStaffCredentials } from "./staff-session";

const previousUsername = process.env.STAFF_USERNAME;
const previousPassword = process.env.STAFF_PASSWORD;
const previousSecret = process.env.STAFF_SESSION_SECRET;

afterEach(() => {
  if (previousUsername === undefined) delete process.env.STAFF_USERNAME;
  else process.env.STAFF_USERNAME = previousUsername;
  if (previousPassword === undefined) delete process.env.STAFF_PASSWORD;
  else process.env.STAFF_PASSWORD = previousPassword;
  if (previousSecret === undefined) delete process.env.STAFF_SESSION_SECRET;
  else process.env.STAFF_SESSION_SECRET = previousSecret;
});

describe("deployment-configured staff credentials", () => {
  it("requires a long password and independent session signing key", () => {
    process.env.STAFF_USERNAME = "clinic-staff";
    process.env.STAFF_PASSWORD = "short";
    process.env.STAFF_SESSION_SECRET = "a".repeat(32);
    expect(staffCredentialsAreConfigured()).toBe(false);

    process.env.STAFF_PASSWORD = "a-long-private-staff-password";
    process.env.STAFF_SESSION_SECRET = "short";
    expect(staffCredentialsAreConfigured()).toBe(false);

    process.env.STAFF_SESSION_SECRET = "b".repeat(32);
    expect(staffCredentialsAreConfigured()).toBe(true);
  });

  it("accepts only the configured account and checks both credential fields", () => {
    process.env.STAFF_USERNAME = "clinic-staff";
    process.env.STAFF_PASSWORD = "a-long-private-staff-password";
    process.env.STAFF_SESSION_SECRET = "b".repeat(32);
    expect(verifyStaffCredentials(" clinic-staff ", "a-long-private-staff-password")).toBe(true);
    expect(verifyStaffCredentials("other", "a-long-private-staff-password")).toBe(false);
    expect(verifyStaffCredentials("clinic-staff", "wrong-password-value")).toBe(false);
  });
});
