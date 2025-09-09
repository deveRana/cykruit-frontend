import { z } from "zod";
import { BLOCKED_EMAIL_DOMAINS } from "@/lib/constants/blocked-email-domains";

const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

export const registerSchema = z
    .object({
        name: z.string().min(2, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(6, "Password must be at least 6 characters")
            .regex(
                strongPasswordRegex,
                "Password must include at least 1 uppercase letter and 1 number"
            ),
        confirmPassword: z.string(),
        role: z.enum(["seeker", "employer"]),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })
    .superRefine((data, ctx) => {
        if (data.role === "employer") {
            const domain = data.email.split("@")[1]?.toLowerCase();
            if (domain && BLOCKED_EMAIL_DOMAINS.includes(domain)) {
                ctx.addIssue({
                    path: ["email"],
                    message: "Please use your company email address",
                    code: z.ZodIssueCode.custom,
                });
            }
        }
    });
