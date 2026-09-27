"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import {
  clearStaffSession,
  createStaffSession,
  staffCredentialsAreConfigured,
  verifyStaffCredentials,
} from "@/lib/staff-session";
import type { StaffLoginState } from "@/lib/form-types";

const loginSchema = z.object({
  username: z.string().trim().min(1).max(120),
  password: z.string().min(1).max(200),
});

export async function signInStaff(_previous: StaffLoginState, formData: FormData): Promise<StaffLoginState> {
  const parsed = loginSchema.safeParse({ username: formData.get("username"), password: formData.get("password") });
  if (!parsed.success) return { error: "Enter your staff username and password." };
  if (!staffCredentialsAreConfigured()) {
    return { error: "Staff sign-in is not configured. Ask the site operator to set the staff environment variables." };
  }
  if (!verifyStaffCredentials(parsed.data.username, parsed.data.password)) {
    return { error: "Those sign-in details weren’t recognized." };
  }

  await createStaffSession();
  redirect("/staff");
}

export async function signOutStaff() {
  await clearStaffSession();
  redirect("/staff/login");
}
