import * as z from "zod";

export const signinSchema = z
  .object({
    username: z.string().min(2, {
      message: "Enter a valid Username",
    }),
    password: z.string().min(8, {
      message: "Enter a valid password",
    }),
  })


export type SigninSchemaType = z.infer<typeof signinSchema>;