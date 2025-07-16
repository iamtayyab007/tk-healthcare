"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "./ui/button";
import { decrypt, encrypt } from "@/lib/crypto";

function OtpVerification({ isAdmin }: any) {
  const adminOtp = process.env.NEXT_PUBLIC_OTP as string;

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const encrypted = encrypt(adminOtp);

  const decrypted = decrypt(encrypted);
  //localStorage.setItem("adminOtp", encrypted);

  useEffect(() => {
    if (isAdmin) {
      setOpen(true);
    }
  }, [isAdmin]);

  const handleSubmit = () => {
    if (value === decrypted) {
      setSuccess(true);
      router.push("/admin");
      //localStorage.setItem("adminOtp", encrypted);
      Cookies.set("adminOtp", encrypted, {
        expires: 1 / 24, // expires in 1 hour (1/24 of a day)
        path: "/", // available throughout the site
        secure: true, // set to true in production
      });
      setError(false);
    } else {
      setError(true);
    }
  };
  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      router.push("/");
    }
    setOpen(isOpen);
  };
  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent
        className="bg-gray-900 opacity-90 flex flex-col justify-center items-center w-[450px] h-[250px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Verify your OTP</DialogTitle>
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="border border-gray-500 data-[active=true]:border-green-300 focus:border-green-500 outline-none"
                />
              ))}
              {/* <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />

              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} /> */}
            </InputOTPGroup>
          </InputOTP>
        </DialogHeader>
        {success && <p className="text-green-500 text-sm">OTP Successfull</p>}
        {error && (
          <p className="text-red-500 text-sm">Invalid OTP Code. Try Again!</p>
        )}
        <Button onClick={handleSubmit} className="bg-green-800 cursor-pointer">
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default OtpVerification;
