import React from "react";
import HomePage from "@/components/landingpage";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div>
      <div className="relative w-full ">
        <div className="flex items-center justify-between px-4 py-4 md:px-10">
          <h1 className="text-3xl font-bold">Medilink</h1>

          <div className="flex gap-x-4">
            <Button size="lg">Login</Button>
          </div>
        </div>
      </div>
      <HomePage />
    </div>
  );
};

export default page;
