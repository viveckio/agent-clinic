"use server";

import { revalidatePath } from "next/cache";
import { createAppointment } from "@/lib/appointment-service";
import { validateBookingInput } from "@/lib/appointment-validation";
import type { BookingFormState, BookingFormValues } from "@/lib/form-types";

const fields = ["agentName", "contactEmail", "careItemSlug", "requestedAt"] as const;

function valuesFrom(formData: FormData): BookingFormValues {
  return Object.fromEntries(fields.map((field) => [field, String(formData.get(field) ?? "")])) as BookingFormValues;
}

export async function bookAppointment(_previousState: BookingFormState, formData: FormData): Promise<BookingFormState> {
  const values = valuesFrom(formData);
  const parsed = validateBookingInput(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Check the details below and try again.",
      errors: parsed.error.flatten().fieldErrors,
      values,
    };
  }

  const result = await createAppointment(parsed.data);
  if (!result.ok) {
    revalidatePath("/book");
    return {
      status: "error",
      message: result.reason === "slot-unavailable"
        ? "That time was just taken or is no longer available. Choose another time."
        : "That care option is no longer available. Choose another option.",
      values,
    };
  }

  revalidatePath("/book");
  revalidatePath("/staff");
  return {
    status: "success",
    message: "Your appointment request is in. It is pending staff review, and this message is not a confirmed appointment.",
    appointmentId: result.appointmentId,
  };
}
