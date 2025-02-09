"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupSchemaType, signupSchema } from "../dto/signupSchema";
import { z } from "zod";
import axios from "axios";

import { useRouter } from "next/navigation";

// Signup component handles user registration for the FocusTrack app
export default function Signup() {
  const router = useRouter();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmationPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    try {
      await axios.post("http://localhost:3002/auth/signup", values, {
        withCredentials: true,
      });
      router.push("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="w-[350px]">
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-black justify-center pb-8 flex items-center font-extrabold text-2xl cursor-pointer">
              <img className="w-[40px]" src="/images.png"></img>
              FocusTracker
            </div>
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-full gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="username">Username</Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="username"
                          placeholder="Enter your username"
                          className="placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="password">Password</Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmationPassword"
                  render={({ field }) => (
                    <FormItem>
                      <Label htmlFor="confirmationPassword">
                        Confirm Password
                      </Label>
                      <FormControl>
                        <Input
                          {...field}
                          id="confirmationPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="placeholder:text-sm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
          <div className="flex items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                onClick={() => redirect("/auth/signin")}
                className="text-primary hover:underline cursor-pointer"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
