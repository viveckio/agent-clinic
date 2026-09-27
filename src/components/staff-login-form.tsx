"use client";

import { useActionState } from "react";
import { signInStaff } from "@/app/actions/staff-auth";
import type { StaffLoginState } from "@/lib/form-types";

const initialState: StaffLoginState = {};

export function StaffLoginForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState(signInStaff, initialState);
  return (
    <form className="booking-form staff-login-form" action={action}>
      {!configured && <p className="form-message form-message-error" role="status">Staff sign-in is not configured. Set the staff environment variables before opening the dashboard.</p>}
      {state.error && <p className="form-message form-message-error" role="alert">{state.error}</p>}
      <fieldset className="staff-login-fields" disabled={!configured}>
        <div className="form-field">
          <label htmlFor="username">Staff username</label>
          <input id="username" name="username" autoComplete="username" required maxLength={120} />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required maxLength={200} />
        </div>
        <button className="button button-primary form-submit" type="submit" disabled={pending || !configured}>{pending ? "Signing in…" : "Sign in"}<span aria-hidden="true">↗</span></button>
      </fieldset>
    </form>
  );
}
