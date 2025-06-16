import { z } from "zod";
export const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "fullname must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10-digits." })
    .max(15, { message: "Phone number cannot be more than 15-digits." })
    .regex(/^\+?\d+$/, { message: "Invalid phone number format." }),
});
