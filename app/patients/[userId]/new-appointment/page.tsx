import AppointmentForm from "@/components/AppointmentForm";
import { getPatientData } from "@/lib/actions/patients.actions";
import Image from "next/image";
import React from "react";

async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const patient = await getPatientData(userId);
  return (
    <div className="h-screen w-[80%] mx-auto">
      <section className="flex flex-col justify-center">
        <div className="m-11 flex justify-start">
          <Image
            src="/assets/icons/logo-full.svg"
            width={150}
            height={150}
            alt="logo"
          />
        </div>
        <div className="m-11 flex flex-col justify-start gap-3">
          <h1 className="font-bold text-xl">Hey there 🖐️ </h1>
          <p className="text-sm">Request a new appointment in 10 seconds</p>
        </div>

        <div className="flex justify-start">
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
        </div>
      </section>
    </div>
  );
}

export default NewAppointment;
