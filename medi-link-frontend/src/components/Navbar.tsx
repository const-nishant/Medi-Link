"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { isUserLoggedIn, logout } from "@/lib/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = () => {
      if (typeof window !== "undefined") {
        const loggedIn = isUserLoggedIn();
        if (!loggedIn) {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
        }
      }
    };
    checkLoginStatus();
  }, [router]);
  return (
    <div className="relative w-full ">
      <div className="flex items-center justify-between px-4 py-4 md:px-10">
        <Link href="/">
          <h1 className="text-3xl font-bold cursor-pointer">Medilink</h1>
        </Link>

        <div className="flex gap-x-4">
          {isLoggedIn ? (
            <>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger className="flex items-center justify-center cursor-pointer">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuLabel>Hello User</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Dashboard</DropdownMenuItem>
                  <DropdownMenuItem>Appointments</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => logout()}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button size="lg">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
