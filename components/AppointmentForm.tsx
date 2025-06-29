"use client";
import React from "react";
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
import { CreateAppointmentSchema } from "@/lib/validationSchemas";
import { FieldType } from "./RegistrationForm";
import { Button } from "./ui/button";
import DateSelector from "./DatePicker";
import { createAppointment } from "@/lib/actions/appointment.actions";

function AppointmentForm({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) {
  const form = useForm<z.infer<typeof CreateAppointmentSchema>>({
    resolver: zodResolver(CreateAppointmentSchema),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CreateAppointmentSchema>) {
    let status;
    switch (type) {
      case "cancel":
        status = "cancelled";
        break;

      case "schedule":
        status = "scheduled";
        break;
      default:
        status = "pending";
        break;
    }

    if (type === "create" && patientId) {
      const userAppointment = {
        userId,
        patient: patientId,
        primaryPhysician: values.primaryPhysician,
        schedule: new Date(values.schedule),
        reason: values.reason,
        note: values.note,
        cancellationReason: values.cancellationReason,
        status: status as Status,
      };
      const appointment = createAppointment(userAppointment);
    }
  }
  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "cancel Appointment";
      break;

    case "create":
      buttonLabel = "create Appointment";
      break;
    case "schedule":
      buttonLabel = "schedule Appointment";
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {type !== "cancel" && (
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
                <CustomFormField
                  control={form.control}
                  label="Additional Comments/Notes"
                  placeholder="ex: prefer afternoon appointments, if possible"
                  iconSrc=""
                  iconAlt=""
                  type={FieldType.AdditionalComments}
                />
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

          {type === "cancel" && (
            <CustomFormField
              control={form.control}
              label="Cancellation Reason"
              placeholder="Enter reason for Cancellation"
              iconSrc=""
              iconAlt=""
              type={FieldType.AdditionalComments}
            />
          )}

          <Button
            type="submit"
            className="bg-green-600 w-xl mx-auto cursor-pointer hover:bg-green-700 text-white"
          >
            {buttonLabel}
          </Button>
        </form>
      </Form>
    </>
  );
}

export default AppointmentForm;
