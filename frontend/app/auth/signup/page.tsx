"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

// Signup component handles user registration for the FocusTrack app
export default function Signup() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign Up to FocusTrack</CardTitle>
          <CardDescription className="text-xs pt-1">
            Create your account to start tracking your productivity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Username</Label>
                <Input
                  id="username"
                  className="placeholder:text-sm"
                  placeholder="Enter your Username"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="placeholder:text-sm"
                />
              </div>
              <div className="flex flex-col gap-2 pb-2">
                <Label htmlFor="name">Confirm Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Confirm Your password"
                  className="placeholder:text-sm"
                />
              </div>
              <Button className="w-full">Sign up</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              onClick={() => router.push("/auth/signin")}
              className="text-primary hover:underline cursor-pointer"
            >
              Sign In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
