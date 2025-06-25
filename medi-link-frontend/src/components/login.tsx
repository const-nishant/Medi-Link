"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [accessToken, setAccessToken] = useState("");

  const handleLogin = async () => {
    console.log("email:", email);
    console.log("password:", password);
    console.log("role:", role);

    const response = await fetch("http://localhost:5000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        role,
        accessToken,
      }),
    });

    const data = await response.json();
    console.log(response);

    console.log("login response:", data);

    if (response.status === 200) {
      alert("Login successful: " + data.data.name);
      router.push(role === "doctor" ? "/doctor/dasboard" : "/patient/dasboard");
    }
  };

  return (
    <Card className="w-full h-full max-w-md max-h-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Login</CardTitle>
        <CardDescription className="text-center">
          Enter your email and password to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
        <div className="text-center text-sm text-muted-foreground mt-2 ">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign Up
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
