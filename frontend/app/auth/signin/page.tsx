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

// SignIn component handles user login for the FocusTrack app
export default function Signin() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In to FocusTrack</CardTitle>
          <CardDescription className="text-xs pt-1">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col w-full gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Username</Label>
                <Input id="username" placeholder="Enter your Username" />
              </div>
              <div className="flex flex-col gap-2 pb-2">
                <Label htmlFor="name">Password</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <Button className="w-full">Sign in</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            You Don't have an account?{" "}
            <a
              onClick={() => router.push("/auth/signup")}
              className="text-primary hover:underline cursor-pointer"
            >
              Sign Up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
