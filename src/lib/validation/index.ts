import * as z from "zod";

export const signUpValidationSchema = z.object({
  name: z.string().min(3, { message: "Too short" }),
  username: z.string().min(3, { message: "Too short" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const signInValidationSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});
