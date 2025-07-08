"use client";
import React, { useState } from "react";
import CustomFormField from "./CustomFormField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateAppointmentSchema,
  getAppointmentSchema,
} from "@/lib/validationSchemas";
import { FieldType } from "./RegistrationForm";
import { Button } from "./ui/button";
import DateSelector from "./DatePicker";
import {
  createAppointment,
  updateAppointmentData,
} from "@/lib/actions/appointment.actions";
import { useRouter } from "next/navigation";
import { Appointment } from "@/types/appwrite.types";

function AppointmentForm({
  userId,
  patientId,
  type,
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancelled" | "schedule";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log("column", appointment);
  console.log("patientid", patientId);
  const AppointmentSchema = getAppointmentSchema(type);
  const form = useForm<z.infer<typeof AppointmentSchema>>({
    resolver: zodResolver(AppointmentSchema),
    defaultValues: {
      primaryPhysician: appointment?.primaryPhysician || "",
      schedule: appointment?.schedule
        ? new Date(appointment.schedule)
        : new Date(),

      reason: appointment?.reason,
      note: appointment?.note,
      cancellationReason: appointment?.cancellationReason || "",
    },
  });
  console.log("type", type);
  async function onSubmit(values: z.infer<typeof AppointmentSchema>) {
    setLoading(true);
    let status;
    switch (type) {
      case "cancelled":
        status = "cancelled";
        break;

      case "schedule":
        status = "scheduled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const userAppointment = {
          // userId,
          // patient: patientId,
          // primaryPhysician: values.primaryPhysician,
          // schedule: new Date(values.schedule),
          // reason: values.reason,
          // note: values.note,
          // cancellationReason: values.cancellationReason,
          // status: status as Status,
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician ?? "",
          schedule: new Date(values.schedule),
          reason: values.reason ?? "",
          note: values.note ?? "",
          cancellationReason: values.cancellationReason ?? "",
          status: status as Status,
        };
        const appointment = await createAppointment(userAppointment);
        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      } else if (type === "schedule") {
        if (!appointment?.$id) {
          throw new Error("Appointment ID is missing");
        }
        const updateAppointment = {
          userId,
          patientId,
          appointmentId: appointment?.$id,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule).toISOString(),
          reason: values.reason ?? "",
          status: type,
        };
        console.log("values", updateAppointment);
        const result = await updateAppointmentData(updateAppointment);
        console.log("updated result", result);
        if (result) {
          setOpen && setOpen(false);
        }
      } else {
        console.log("button clicked");
        if (!appointment?.$id) {
          console.error("Missing appointment ID");
          return;
        }

        const cancelAppointment = {
          userId,
          appointmentId: appointment?.$id,
          cancellationReason: values.cancellationReason ?? "",
          status: type,
        };
        const result = await updateAppointmentData(cancelAppointment);
        console.log("cancel", result);
        if (result) {
          setOpen && setOpen(false);
        }
      }
    } catch (error: any) {
      console.log(error?.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  }
  let buttonLabel;
  switch (type) {
    case "cancelled":
      buttonLabel = "Cancel Appointment";
      break;

    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-2 md:px-4 w-full"
        >
          {type !== "cancelled" && (
            <>
              <div>
                <CustomFormField
                  control={form.control}
                  label="Doctor"
                  placeholder="Select a Doctor"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.SelectOptions}
                />
              </div>
              <div className="flex flex-row gap-5">
                <CustomFormField
                  control={form.control}
                  label="Reason for Appointment"
                  placeholder="ex: Annual monthly checkup"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.AppointmentReason}
                />
                {type !== "schedule" && (
                  <CustomFormField
                    control={form.control}
                    label="Additional Comments/Notes"
                    placeholder="ex: prefer afternoon appointments, if possible"
                    iconSrc=""
                    iconAlt=""
                    type={FieldType.AdditionalComments}
                  />
                )}
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="schedule"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expected Appointment Date</FormLabel>
                      <div>
                        <FormControl>
                          <DateSelector field={field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          )}

          {type === "cancelled" && (
            <CustomFormField
              control={form.control}
              label="Cancellation Reason"
              placeholder="Enter reason for Cancellation"
              iconSrc=""
              iconAlt=""
              type={FieldType.CancellationReason}
            />
          )}

          <Button
            type="submit"
            className={`${
              type === "cancelled"
                ? "bg-red-600 w-sm mx-auto cursor-pointer hover:bg-red-700 text-white"
                : "bg-green-600 w-sm mx-auto cursor-pointer hover:bg-green-700 text-white"
            }`}
          >
            {loading ? "loading..." : buttonLabel}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default AppointmentForm;
