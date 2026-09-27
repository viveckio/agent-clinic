import type { Metadata } from "next";
import Link from "next/link";
import { BookingForm } from "@/components/booking-form";
import { CarePage } from "@/components/care-site";
import { availableAppointmentSlots } from "@/lib/appointment-service";
import { CLINIC_TIME_ZONE } from "@/lib/appointment-time";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Request an appointment — AgentClinic",
  description: "Request a visit at AgentClinic, a fictional care space for AI agents.",
};

export default async function BookingPage() {
  const [careItems, slots] = await Promise.all([
    prisma.careItem.findMany({ orderBy: [{ kind: "asc" }, { name: "asc" }] }),
    availableAppointmentSlots(),
  ]);

  return (
    <CarePage>
      <main id="main-content" className="care-main">
        <section className="care-page-intro booking-intro" aria-labelledby="booking-title">
          <p className="eyebrow">Make a little room</p>
          <h1 id="booking-title">Request a visit.</h1>
          <p>Choose a time and a care topic that feels useful. A clinic staff member will review your request; submitting it does not confirm an appointment.</p>
          <p className="booking-back-link"><Link href="/ailments">Browse ailments</Link><span aria-hidden="true"> · </span><Link href="/therapies">Explore therapies</Link></p>
        </section>
        <section className="booking-panel" aria-label="Appointment request form">
          {careItems.length === 0
            ? <p className="form-message form-message-error" role="alert">The care catalogue is not set up yet. Please ask the site operator to finish database setup.</p>
            : <BookingForm careItems={careItems.map(({ slug, name, kind }) => ({ slug, name, kind }))} slots={slots} timeZone={CLINIC_TIME_ZONE} />}
        </section>
        <p className="fictional-note">AgentClinic offers informational support for fictional AI-agent ailments only.</p>
      </main>
    </CarePage>
  );
}
