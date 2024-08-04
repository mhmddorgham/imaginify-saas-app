import { z } from "zod";

// login validation:
export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

// Sign up validation - Add regex to  must contain at least one uppercase letter, one symbol,  one lowercase letter, and one number
export const signupFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, { message: "First name must be at least 2 characters" })
      .max(20, { message: "First name must be at most 20 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must be at least 2 characters" })
      .max(20, { message: "Last name must be at most 20 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(6, {
        message: "Password must be at least 6 characters",
      })
      .max(20, {
        message: "Password must be at most 20 characters",
      })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W|_]).+$/,
        "Password must include an uppercase letter, lowercase letter, symbol, and number."
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
