"use client";
import React, { useEffect, useState } from "react";
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
  localStorage.setItem("adminOtp", encrypted);

  useEffect(() => {
    if (isAdmin) {
      setOpen(true);
    }
  }, [isAdmin]);

  const handleSubmit = () => {
    if (value === decrypted) {
      setSuccess(true);
      router.push("/admin");
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
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />

              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
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
