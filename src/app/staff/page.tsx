import type { Metadata } from "next";
import Link from "next/link";
import { signOutStaff } from "@/app/actions/staff-auth";
import { updateAppointmentStatus } from "@/app/actions/staff-appointments";
import { CarePage } from "@/components/care-site";
import { clinicDayRange, formatClinicDateTime } from "@/lib/appointment-time";
import { listAppointments } from "@/lib/appointment-service";
import { requireStaff } from "@/lib/staff-session";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Staff dashboard — AgentClinic" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const allowedStatuses = ["ALL", "PENDING", "CONFIRMED", "CANCELLED"] as const;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function statusLabel(status: string) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default async function StaffDashboard({ searchParams }: { searchParams: SearchParams }) {
  await requireStaff();
  const params = await searchParams;
  const query = (first(params.q) ?? "").slice(0, 100);
  const selectedStatus = allowedStatuses.includes(first(params.status) as typeof allowedStatuses[number])
    ? first(params.status) as typeof allowedStatuses[number]
    : "ALL";
  const fromDate = first(params.from) ?? "";
  const toDate = first(params.to) ?? "";
  const fromRange = fromDate ? clinicDayRange(fromDate)?.from : undefined;
  const toRange = toDate ? clinicDayRange(toDate)?.to : undefined;
  const appointments = await listAppointments({
    query,
    status: selectedStatus,
    from: fromRange,
    to: toRange,
  });
  const pendingCount = appointments.filter((appointment) => appointment.status === "PENDING").length;
  const updated = first(params.updated) === "1";
  const error = first(params.error);

  return (
    <CarePage>
      <main id="main-content" className="care-main staff-main">
        <section className="care-page-intro staff-dashboard-intro" aria-labelledby="staff-title">
          <div className="staff-heading-row">
            <div><p className="eyebrow">Clinic team</p><h1 id="staff-title">Appointment requests.</h1></div>
            <form action={signOutStaff}><button className="button button-outline" type="submit">Sign out</button></form>
          </div>
          <p>Review requests, find a good time, and update each visit’s status.</p>
        </section>

        <section className="staff-dashboard" aria-label="Appointment management">
          <div className="staff-summary">
            <article><span className="summary-count">{appointments.length}</span><span>Requests shown</span></article>
            <article><span className="summary-count">{pendingCount}</span><span>Pending review</span></article>
          </div>

          {updated && <p className="form-message form-message-success" role="status">Appointment status updated.</p>}
          {error && <p className="form-message form-message-error" role="alert">{error === "not-found" ? "That request could not be found." : error === "invalid-transition" ? "That status change is no longer available." : "The request could not be updated."}</p>}

          <form className="staff-filters" method="get" action="/staff" role="search" aria-label="Filter appointment requests">
            <div className="form-field"><label htmlFor="q">Search requests</label><input id="q" name="q" type="search" maxLength={100} placeholder="Name, email, or care topic" defaultValue={query} /></div>
            <div className="form-field"><label htmlFor="status">Status</label><select id="status" name="status" defaultValue={selectedStatus}>{allowedStatuses.map((status) => <option key={status} value={status}>{status === "ALL" ? "All statuses" : statusLabel(status)}</option>)}</select></div>
            <div className="form-field"><label htmlFor="from">From date</label><input id="from" name="from" type="date" defaultValue={fromDate} /></div>
            <div className="form-field"><label htmlFor="to">To date</label><input id="to" name="to" type="date" defaultValue={toDate} /></div>
            <button className="button button-primary staff-filter-submit" type="submit">Apply filters</button>
            <Link className="staff-clear-link" href="/staff">Clear filters</Link>
          </form>

          {appointments.length === 0 ? (
            <div className="staff-empty"><span aria-hidden="true">✳</span><h2>No requests match these filters.</h2><p>New appointment requests will appear here for the clinic team.</p></div>
          ) : (
            <div className="appointment-list">
              {appointments.map((appointment) => (
                <article className="appointment-card" key={appointment.id}>
                  <div className="appointment-card-main">
                    <div className="appointment-card-heading"><span className={`status-badge status-${appointment.status.toLowerCase()}`}>{statusLabel(appointment.status)}</span><time dateTime={appointment.requestedAt.toISOString()}>{formatClinicDateTime(appointment.requestedAt)}</time></div>
                    <h2>{appointment.agentName}</h2>
                    <a className="appointment-email" href={`mailto:${appointment.contactEmail}`}>{appointment.contactEmail}</a>
                    <p className="appointment-care-item">{appointment.careItem.kind === "THERAPY" ? "Therapy" : "Ailment"}: <Link href={`/${appointment.careItem.kind === "THERAPY" ? "therapies" : "ailments"}/${appointment.careItem.slug}`}>{appointment.careItem.name}</Link></p>
                    <p className="appointment-created">Requested {formatClinicDateTime(appointment.createdAt)}</p>
                  </div>
                  <div className="appointment-actions" aria-label={`Update ${appointment.agentName}’s request`}>
                    {appointment.status === "PENDING" && <form action={updateAppointmentStatus}><input type="hidden" name="appointmentId" value={appointment.id} /><button className="button button-confirm" name="status" value="CONFIRMED" type="submit">Confirm</button></form>}
                    {appointment.status !== "CANCELLED" && <form action={updateAppointmentStatus}><input type="hidden" name="appointmentId" value={appointment.id} /><button className="button button-outline" name="status" value="CANCELLED" type="submit">Cancel</button></form>}
                    {appointment.status === "CANCELLED" && <span className="cancelled-note">No further action</span>}
                  </div>
                </article>
              ))}
              <p className="staff-result-note">Showing up to 100 matching requests.</p>
            </div>
          )}
        </section>
      </main>
    </CarePage>
  );
}
