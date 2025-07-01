import { getAppointmentDetails } from "@/lib/actions/appointment.actions";
import Image from "next/image";
import React from "react";
import { Doctors } from "@/contants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function Success({ searchParams, params: { userId } }: SearchParamProps) {
  const appointmentId = (searchParams?.appointmentId as string) || "";
  const reqAppointmentDetails = await getAppointmentDetails(appointmentId);
  const date = new Date(reqAppointmentDetails.schedule);
  const formattedSchedule = date.toLocaleString("en-US", {
    dateStyle: "long", // e.g., June 30, 2025
    timeStyle: "short", // e.g., 6:33 PM
  });

  const doctorImage = Doctors.find(
    (doctor) => doctor.name === reqAppointmentDetails.primaryPhysician
  );
  console.log("doc", doctorImage);
  return (
    <div className="h-screen max-h-screen px-[5%] py-11">
      <section className="flex flex-col justify-center items-center">
        <div className="flex justify-center items-center">
          <Link href="/">
            <Image
              src="/assets/icons/logo-full.svg"
              width={150}
              height={150}
              alt="logo"
              className="cursor-pointer"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-center items-center h-[calc(100vh-250px)]">
          <Image
            src="/assets/gifs/success.gif"
            width={300}
            height={300}
            alt="logo"
            className="cursor-pointer"
          />

          <h1 className="font-bold text-2xl">
            Your <span className="text-green-500">Appointment request</span> has{" "}
            <br />
            been successfully submitted!
          </h1>
          <p className="mt-3 text-sm">We'll be in touch shortly to confirm.</p>
        </div>
        <div className="flex flex-row gap-3 border-2  border-amber-200 w-auto p-5 items-center">
          <h2>Request Appointment Details:</h2>
          <p className="flex flex-row items-center gap-3 bg-gray-800  rounded-xl p-1">
            <span>
              {" "}
              <Image
                src={doctorImage?.image || ""}
                width={30}
                height={30}
                alt="logo"
              />
            </span>
            {reqAppointmentDetails.primaryPhysician}
          </p>
          <p className="flex flex-row items-center gap-3">
            <span>
              <Image
                src="/assets/icons/calendar.svg"
                width={30}
                height={30}
                alt="logo"
              />
            </span>
            {formattedSchedule}
          </p>
        </div>
        <Button className="bg-green-700 mt-5">
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
      </section>
    </div>
  );
}

export default Success;
