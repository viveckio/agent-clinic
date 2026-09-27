"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { changeAppointmentStatus } from "@/lib/appointment-service";
import { requireStaff } from "@/lib/staff-session";

const statusSchema = z.object({
  appointmentId: z.string().min(1).max(100),
  status: z.enum(["CONFIRMED", "CANCELLED"]),
});

export async function updateAppointmentStatus(formData: FormData) {
  await requireStaff();
  const parsed = statusSchema.safeParse({
    appointmentId: formData.get("appointmentId"),
    status: formData.get("status"),
  });
  if (!parsed.success) redirect("/staff?error=invalid-request");

  const result = await changeAppointmentStatus(parsed.data.appointmentId, parsed.data.status);
  if (!result.ok) {
    revalidatePath("/staff");
    redirect(`/staff?error=${result.reason}`);
  }
  revalidatePath("/staff");
  redirect("/staff?updated=1");
}
