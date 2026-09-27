import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { constantTimeStringEqual, createStaffSessionToken, verifyStaffSessionToken } from "@/lib/staff-session-crypto";

const COOKIE_NAME = "agentclinic_staff";
const SESSION_SECONDS = 8 * 60 * 60;

function sessionSecret() {
  const secret = process.env.STAFF_SESSION_SECRET;
  if (!secret || Buffer.byteLength(secret) < 32) return undefined;
  return secret;
}

export function staffCredentialsAreConfigured() {
  return Boolean(
    process.env.STAFF_USERNAME?.trim() &&
    (process.env.STAFF_PASSWORD?.length ?? 0) >= 20 &&
    sessionSecret(),
  );
}

export function verifyStaffCredentials(username: string, password: string) {
  const configuredUsername = process.env.STAFF_USERNAME?.trim();
  const configuredPassword = process.env.STAFF_PASSWORD;
  if (!configuredUsername || !configuredPassword || configuredPassword.length < 20 || !sessionSecret()) return false;
  const usernameMatches = constantTimeStringEqual(username.trim(), configuredUsername);
  const passwordMatches = constantTimeStringEqual(password, configuredPassword);
  return usernameMatches && passwordMatches;
}

export async function createStaffSession() {
  const secret = sessionSecret();
  if (!secret) throw new Error("Staff session secret is not configured.");
  const expiresAt = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  const token = createStaffSessionToken(expiresAt, secret);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/staff",
    maxAge: SESSION_SECONDS,
  });
}

export async function staffIsAuthenticated() {
  const secret = sessionSecret();
  if (!secret) return false;
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifyStaffSessionToken(token, secret);
}

export async function requireStaff() {
  if (!(await staffIsAuthenticated())) redirect("/staff/login");
}

export async function clearStaffSession() {
  (await cookies()).set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/staff",
    maxAge: 0,
  });
}
