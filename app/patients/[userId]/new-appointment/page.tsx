import Image from "next/image";
import React from "react";

function NewAppointment() {
  return (
    <div className="h-screen w-[80%]">
      <section className="flex flex-col">
        <div className="m-11 ">
          <Image
            src="/assets/icons/logo-full.svg"
            width={150}
            height={150}
            alt="logo"
          />
        </div>
        <div className="m-11 flex flex-col gap-3">
          <h1 className="font-bold text-xl">Hey there 🖐️ </h1>
          <p className="text-sm">Request a new appointment in 10 seconds</p>
        </div>
      </section>
    </div>
  );
}

export default NewAppointment;
