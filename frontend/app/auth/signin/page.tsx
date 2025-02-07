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
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SigninSchemaType, signinSchema } from "../dto/signinSchema";
import { z } from "zod";
import axios from "axios";



// SignIn component handles user login for the FocusTrack app
export default function Signin() {
  const router = useRouter();

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
	username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
	console.log(values)
    try {
		await axios.post("http://localhost:3001/auth/signin", values, {withCredentials: true});
		router.push("/")
	}
	catch (error) {
		console.log(error);
	}
  };

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
		<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="username">Username</Label>
              <FormControl>
                <Input {...field} id="username" placeholder="Enter your Username" />
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
                <Input {...field} id="password" type="password" placeholder="Enter your password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button  type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </Form>
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
