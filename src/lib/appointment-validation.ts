import { z } from "zod";

export const bookingSchema = z.object({
  agentName: z.string().trim().min(2, "Enter a name with at least 2 characters.").max(80, "Keep the name under 80 characters."),
  contactEmail: z.string().trim().pipe(z.email("Enter a valid email address.").max(254, "Keep the email address under 254 characters.")),
  careItemSlug: z.string().trim().min(1, "Choose an ailment or therapy."),
  requestedAt: z.iso.datetime({ offset: true, error: "Choose an available appointment time." }),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export function validateBookingInput(input: unknown) {
  return bookingSchema.safeParse(input);
}
