"use client";
import OtpVerification from "@/components/OtpVerification";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();
  const alreadyVerifiedAdmin = localStorage.getItem("adminOtp");
  if (!alreadyVerifiedAdmin) {
    router.push("/?admin=true");
  }
  return (
    <div>
      <Link href="/">home</Link>
    </div>
  );
}
