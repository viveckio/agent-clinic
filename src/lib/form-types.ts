import type { z } from "zod";
import type { bookingSchema } from "@/lib/appointment-validation";

export type BookingFormValues = Partial<z.input<typeof bookingSchema>>;
export type BookingFormState = {
  status: "idle" | "error" | "success";
  message?: string;
  appointmentId?: string;
  errors?: Partial<Record<keyof z.input<typeof bookingSchema>, string[]>>;
  values?: BookingFormValues;
};

export type StaffLoginState = {
  error?: string;
  email?: string;
};
