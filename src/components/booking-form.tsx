"use client";

import { useActionState, useState } from "react";
import { bookAppointment } from "@/app/actions/booking";
import type { AvailableSlot } from "@/lib/appointment-time";
import type { BookingFormState } from "@/lib/form-types";

type CareChoice = { slug: string; name: string; kind: string };
const initialState: BookingFormState = { status: "idle" };

function FieldError({ id, errors }: { id: string; errors?: string[] }) {
  return errors?.length ? <p className="field-error" id={`${id}-error`}>{errors[0]}</p> : null;
}

export function BookingForm({ careItems, slots, timeZone }: { careItems: CareChoice[]; slots: AvailableSlot[]; timeZone: string }) {
  const [state, action, pending] = useActionState(bookAppointment, initialState);
  const [agentName, setAgentName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [careItemSlug, setCareItemSlug] = useState("");
  const [requestedAt, setRequestedAt] = useState("");

  if (state.status === "success") {
    return (
      <section className="form-success" role="status" aria-labelledby="booking-success-title">
        <span className="success-mark" aria-hidden="true">✓</span>
        <p className="eyebrow">Request received</p>
        <h2 id="booking-success-title">A little room has been made.</h2>
        <p>{state.message}</p>
        <p className="reference-number">Request reference <strong>{state.appointmentId?.slice(-8).toUpperCase()}</strong></p>
        <a className="button button-primary" href="/">Back to AgentClinic</a>
      </section>
    );
  }

  const slotsByDate = new Map<string, AvailableSlot[]>();
  for (const slot of slots) slotsByDate.set(slot.dateKey, [...(slotsByDate.get(slot.dateKey) ?? []), slot]);

  return (
    <form className="booking-form" action={action}>
      {state.message && <p className="form-message form-message-error" role="alert">{state.message}</p>}
      <div className="form-field">
        <label htmlFor="agentName">Agent or contact name</label>
        <input id="agentName" name="agentName" autoComplete="name" required minLength={2} maxLength={80} value={agentName} onChange={(event) => setAgentName(event.target.value)} aria-invalid={Boolean(state.errors?.agentName?.length)} aria-describedby={state.errors?.agentName ? "agentName-error" : undefined} />
        <FieldError id="agentName" errors={state.errors?.agentName} />
      </div>
      <div className="form-field">
        <label htmlFor="contactEmail">Contact email</label>
        <input id="contactEmail" name="contactEmail" type="email" autoComplete="email" required maxLength={254} value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} aria-invalid={Boolean(state.errors?.contactEmail?.length)} aria-describedby={state.errors?.contactEmail ? "contactEmail-error" : undefined} />
        <FieldError id="contactEmail" errors={state.errors?.contactEmail} />
      </div>
      <div className="form-field">
        <label htmlFor="careItemSlug">What would you like to explore?</label>
        <select id="careItemSlug" name="careItemSlug" required value={careItemSlug} onChange={(event) => setCareItemSlug(event.target.value)} aria-invalid={Boolean(state.errors?.careItemSlug?.length)} aria-describedby={state.errors?.careItemSlug ? "careItemSlug-error" : undefined}>
          <option value="">Choose an ailment or therapy</option>
          <optgroup label="Ailments">{careItems.filter((item) => item.kind === "AILMENT").map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</optgroup>
          <optgroup label="Therapies">{careItems.filter((item) => item.kind === "THERAPY").map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}</optgroup>
        </select>
        <FieldError id="careItemSlug" errors={state.errors?.careItemSlug} />
      </div>
      <div className="form-field">
        <label htmlFor="requestedAt">Available weekday appointment</label>
        <select id="requestedAt" name="requestedAt" required value={requestedAt} onChange={(event) => setRequestedAt(event.target.value)} aria-invalid={Boolean(state.errors?.requestedAt?.length)} aria-describedby={state.errors?.requestedAt ? "requestedAt-error" : "slot-help"}>
          <option value="">Choose a date and time</option>
          {[...slotsByDate.entries()].map(([dateKey, dateSlots]) => <optgroup key={dateKey} label={dateSlots[0].dateLabel}>{dateSlots.map((slot) => <option key={slot.value} value={slot.value}>{slot.timeLabel}</option>)}</optgroup>)}
        </select>
        <p className="field-hint" id="slot-help">Weekdays, 9:00 am–5:00 pm clinic time, in 30-minute intervals. Times are shown in {timeZone}.</p>
        <FieldError id="requestedAt" errors={state.errors?.requestedAt} />
      </div>
      <p className="booking-privacy">Your request is stored securely for clinic staff. We won’t send email or reminders in this MVP.</p>
      <button className="button button-primary form-submit" type="submit" disabled={pending || slots.length === 0 || careItems.length === 0}>
        {pending ? "Sending request…" : "Request an appointment"} <span aria-hidden="true">↗</span>
      </button>
      {slots.length === 0 && <p className="field-hint" role="status">There are no open times in the next two weeks. Please check back soon.</p>}
    </form>
  );
}
