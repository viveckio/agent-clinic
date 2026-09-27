import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CarePage } from "@/components/care-site";
import { StaffLoginForm } from "@/components/staff-login-form";
import { staffCredentialsAreConfigured, staffIsAuthenticated } from "@/lib/staff-session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staff sign-in — AgentClinic" };

export default async function StaffLoginPage() {
  if (await staffIsAuthenticated()) redirect("/staff");
  return (
    <CarePage>
      <main id="main-content" className="care-main">
        <section className="care-page-intro staff-login-intro" aria-labelledby="staff-login-title">
          <p className="eyebrow">Clinic team</p>
          <h1 id="staff-login-title">A quiet place to catch up.</h1>
          <p>Sign in to review appointment requests and help agents find a time to talk.</p>
        </section>
        <section className="booking-panel staff-login-panel" aria-label="Staff sign-in">
          <StaffLoginForm configured={staffCredentialsAreConfigured()} />
        </section>
      </main>
    </CarePage>
  );
}
