"use client";
import { SignUp } from "@/components/SignUp";
// import SignUp from '@/components/SignUp'
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-10 text-black">
      <SignUp />
    </div>
  );
};

export default page;
