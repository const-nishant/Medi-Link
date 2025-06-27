"use client";

import { useState } from "react";
// import {Input} from "@heroui/form";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { signUp } from "@/lib/api";
import { toast } from "sonner";

export function SignUp() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!email || !password || !role) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Invalid email format");
      return;
    }
    if (!name) {
      toast.error("Name is required");
      return;
    }

    const response = await signUp(name, email, password, role);
    const data = await response.json();

    const token = data.data.token;
    const user = data.data.user;
    localStorage.setItem("token", token);
    localStorage.setItem("userId", user._id);
    localStorage.setItem("role", user.role);

    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/email-verification/request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      toast.success("Signup successful");
      router.push("/signup/verify");
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1.5">
        <CardTitle className="text-2xl text-center">
          Create new account{" "}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="flex flex-col gap-4  mt-4">
          <div className="grid gap-2 ">
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
          <div className="grid gap-2">
            <Label htmlFor="confirmpassword">Verify Password</Label>
            <Input
              id="confirmpassword"
              type="true"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <RadioGroup
              defaultValue="patient"
              onValueChange={setRole}
              className="p-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="patient" id="patient" />
                <Label htmlFor="patient">Patient</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="doctor" id="doctor" />
                <Label htmlFor="doctor">Doctor</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleSignup} className="w-full">
          Sign Up
        </Button>
        <div className="text-center text-sm text-muted-foreground mt-2 ">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
