import * as z from "zod";

export const RegistrationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .regex(/^[a-zA-Z\s.]{2,64}$/, "Please enter a valid name"),
  student_id: z
    .string()
    .min(4, "Student ID is required")
    .regex(/^[a-zA-Z0-9\-/]+$/, "Please enter a valid student ID"),
  batch: z.enum(
    ["25.3", "25.2", "25.1", "24.3", "24.2", "24.1", "23.2", "23.1", "22.2"],
    { message: "Please select a valid batch" },
  ),
  phone_number: z
    .string()
    .regex(/^[+]?[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
});

export type RegistrationType = z.infer<typeof RegistrationSchema>;
