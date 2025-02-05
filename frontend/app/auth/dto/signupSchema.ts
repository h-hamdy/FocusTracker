// schemas/signupSchema.ts

import * as z from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, {
      message: "Username must be at least 3 characters.",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long.",
    }),
    confirmPassword: z.string(),
  })
  .refine((data : any) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
