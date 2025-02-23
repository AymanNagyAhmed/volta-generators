import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string()
    .min(1, "Please confirm your password"),
//   phoneNumber: z
//     .string()
//     .min(1, "Phone number is required")
//     .min(10, "Phone number must be at least 10 characters"),
//   username: z
//     .string()
//     .min(1, "Username is required")
//     .min(3, "Username must be at least 3 characters")
//     .max(20, "Username must be less than 20 characters")
//     .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterInput = z.infer<typeof registerSchema>; 