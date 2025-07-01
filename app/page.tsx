"use client";
import OtpVerification from "@/components/OtpVerification";
import { PatientForm } from "@/components/PatientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
  const isAdmin = searchParams.admin;
  const adminAlreadyLogin = localStorage.getItem("adminOtp");
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP Verification | passkey modal*/}
      {isAdmin && <OtpVerification isAdmin={isAdmin} />}

      <section className="remove-scrollbar container my-auto">
        <div className="mx-auto flex size-full flex-col py-10 max-w-[496px] ">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="patient"
            className="mt-0 mb-12 h-10 w-fit"
          />

          <PatientForm />
          <div className="text-sm mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePlus
            </p>
            <Link
              href={`${adminAlreadyLogin ? "/admin" : "/?admin=true"}`}
              className="text-green-300"
            >
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  );
}
