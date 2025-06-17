import { RegistrationForm } from "@/components/RegisterForm";
import Image from "next/image";
import React from "react";

function Register() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[850px] flex-1 gap-9">
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="careplus logo"
          />
          <RegistrationForm />
        </div>
      </section>
    </div>
  );
}

export default Register;
