import { RegistrationForm } from "@/components/RegistrationForm";
import { getUser } from "@/lib/actions/patients.actions";
import Image from "next/image";
import React from "react";

async function Register({ params }: SearchParamProps) {
  const { userId } = params;
  const user = await getUser(userId);

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
          <RegistrationForm user={user} />
        </div>
      </section>
    </div>
  );
}

export default Register;
