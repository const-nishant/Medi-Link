import React from "react";
import HomePage from "@/components/landingpage";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <div>
      <div className="relative w-full ">
        <div className="flex items-center justify-between px-4 py-4 md:px-10">
          <h1 className="text-3xl font-bold">Medilink</h1>

          <div className="flex gap-x-4">
            <Link href="/login">
              <Button size="lg">Login</Button>
            </Link>
          </div>
        </div>
      </div>
      <HomePage />
    </div>
  );
};

export default page;
