import AppointmentForm from "@/components/AppointmentForm";
import { getPatientData } from "@/lib/actions/patients.actions";
import Image from "next/image";
import React from "react";

async function NewAppointment({ params: { userId } }: SearchParamProps) {
  const patient = await getPatientData(userId);
  return (
    <div className="h-screen w-[80%] mx-auto flex flex-row gap-11">
      <section className="flex flex-col justify-center my-auto">
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

      <Image
        src="/assets/images/appointment-img.png"
        height={1500}
        width={1500}
        alt="appointment"
        className="hidden h-full object-cover md:block max-w-[390px] bg-bottom right-0"
      />
    </div>
  );
}

export default NewAppointment;
