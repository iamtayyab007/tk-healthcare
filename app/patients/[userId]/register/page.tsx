import Image from "next/image";
import React from "react";

function Register() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="relative flex-1 overflow-y-auto px-[5%]">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[850px] flex-1">
          <Image
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="careplus logo"
          />
        </div>
      </section>
    </div>
  );
}

export default Register;
