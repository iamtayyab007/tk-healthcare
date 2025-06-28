import { RegistrationForm } from "@/components/RegistrationForm";
import { getUser } from "@/lib/actions/patients.actions";
import Image from "next/image";
import React from "react";

async function Register({ params }: SearchParamProps) {
  const { userId } = params;
  const user = await getUser(userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-lg">
          User not found or failed to load.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar relative flex-1 px-[5%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[850px] flex-1 gap-9">
          <Image
            src="/assets/icons/logo-full.svg"
            height={100}
            width={100}
            alt="careplus logo"
          />
          <RegistrationForm user={user} />
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[390px] h-full"
      />
    </div>
  );
}

export default Register;
