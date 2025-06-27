"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/api";

const Page = () => {
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();

  const submitOtp = async () => {
    if (otpValue.length < 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      const res = await verifyEmail(otpValue);
      if (res.ok) {
        toast.success("Email verified successfully!");
        localStorage.setItem("isEmailVerified", "true");
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Error verifying OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-background px-4">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-black shadow-lg rounded-xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground">
            Enter the 6-digit code sent to your email to complete verification.
          </p>
        </div>

        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            pattern="^[0-9]"
            className="w-full max-w-md"
            onChange={(value) => setOtpValue(value)}
          >
            <InputOTPGroup>
              {Array.from({ length: 6 }).map((_, idx) => (
                <InputOTPSlot key={idx} index={idx} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          className="w-full mt-4"
          onClick={submitOtp}
          disabled={otpValue.length < 6}
        >
          Verify OTP
        </Button>
      </div>
    </div>
  );
};

export default Page;
