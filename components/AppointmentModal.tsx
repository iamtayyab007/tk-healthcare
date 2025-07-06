"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AppointmentForm from "./AppointmentForm";
import { Appointment } from "@/types/appwrite.types";

function AppointmentModal({
  data,
  patientId,
  userId,
  appointment,
}: {
  data: any;
  patientId: string;
  userId: string;
  appointment?: Appointment;
}) {
  const [open, setOpen] = useState(false);
  const cancel = data.cancel;
  const schedule = data.schedule;

  return (
    <div className="flex gap-1">
      {schedule && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="text-green-400 cursor-pointer">
            Schedule
          </DialogTrigger>
          <DialogContent
            className="bg-gray-900 w-screen"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <DialogHeader>
              <DialogTitle>Schedule Appointment</DialogTitle>
              <DialogDescription>
                Please fill in the following details to schedule
              </DialogDescription>
            </DialogHeader>

            <AppointmentForm
              type="schedule"
              patientId={patientId}
              userId={userId}
              appointment={appointment}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      )}

      {cancel && (
        <Dialog>
          <DialogTrigger className="text-red-400 cursor-pointer">
            Cancel
          </DialogTrigger>
          <DialogContent
            onInteractOutside={(e) => e.preventDefault()} // ✅ Prevent close on outside click
            className="bg-gray-900 w-screen"
          >
            <DialogHeader className="flex flex-col items-center justify-center">
              <DialogTitle>Cancel Appointment</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel your Appointment?
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <AppointmentForm
                type="cancelled"
                patientId={patientId}
                userId={userId}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default AppointmentModal;
