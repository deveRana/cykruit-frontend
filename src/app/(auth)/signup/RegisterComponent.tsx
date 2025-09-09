"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/validators/auth.schema";
import { z } from "zod";
import { useAuth } from "@/features/auth/hooks/useAuth";
import InputField from "@/components/forms/InputField";
import { BackendError } from "@/lib/models/backend-error.model";
import AuthIllustration from "@/components/auth/AuthIllustration";
import { useMessageModal } from "@/components/micro-interactions/modal/MessageModal";

type RegisterFormData = z.infer<typeof registerSchema>;
type FormFieldName = keyof RegisterFormData;

export default function RegisterComponent() {
    const searchParams = useSearchParams();
    const roleParam = searchParams.get("role") || "seeker";
    const isEmployer = roleParam === "employer";

    const { register: registerMutation } = useAuth();
    const messageModal = useMessageModal();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        defaultValues: { role: roleParam as "seeker" | "employer" },
    });

    const passwordValue = watch("password");

    const onSubmit = (data: RegisterFormData) => {
        const payload = {
            email: data.email,
            password: data.password,
            fullName: data.name,
            role: data.role.toUpperCase() as "SEEKER" | "EMPLOYER",
        };

        registerMutation.mutate(payload, {
            onError: (errors: BackendError[], res: any) => {
                let message = "Registration failed. Try again.";

                if (Array.isArray(errors) && errors.length > 0) {
                    // Collect all messages from errors array
                    const messages = errors.map(err => err.message).filter(Boolean);
                    if (messages.length > 0) {
                        message = messages.join("\n"); // join multiple messages
                    }
                }

                messageModal.showMessage("error", message);
            },
            onSuccess: () => {
                // reset();
                const roleQuery = data.role === "employer" ? "?role=employer" : "?role=seeker";

                messageModal.showMessage("success", "Registered successfully!", () => {
                    window.location.href = `/login${roleQuery}`;
                });
            },
        });
    };


    const fields: {
        label: string;
        name: FormFieldName;
        type: string;
        placeholder?: string;
        showStrength?: boolean;
    }[] = [
            { label: "Name", name: "name", type: "text", placeholder: "Enter your full name" },
            { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
            { label: "Password", name: "password", type: "password", placeholder: "Enter your password", showStrength: true },
            { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Confirm your password" },
        ];

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-[var(--foreground)]">
            {/* Left Illustration */}
            <AuthIllustration urlPath="/signup" className="w-1/2" />

            {/* Right Form */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-4">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Image src="assets/logo.svg" alt="Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-[var(--primary)]">Cykruit</span>
                    </div>

                    {/* Title */}
                    <div className="text-left space-y-2">
                        <h2 className="text-3xl font-bold text-[var(--foreground)]">Sign Up</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Join us! Create your account to get started.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field) => (
                            <InputField
                                key={field.name}
                                label={field.label}
                                type={field.type}
                                placeholder={field.placeholder}
                                register={register(field.name)}
                                error={errors[field.name]}
                                value={field.name === "password" ? passwordValue : undefined}
                                showStrength={field.showStrength}
                            />
                        ))}

                        <button
                            type="submit"
                            disabled={!isValid || registerMutation.isPending}
                            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${isValid
                                ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {registerMutation.isPending ? "Loading" : "Sign Up"}
                        </button>
                    </form>

                    {/* Google Sign-up for seekers only */}
                    {!isEmployer && (
                        <>
                            <div className="flex items-center my-6">
                                <div className="flex-grow border-t border-[var(--border)]"></div>
                                <span className="mx-3 text-sm text-[var(--muted-foreground)] bg-[var(--background)] px-2 z-10">
                                    Or sign up with Google
                                </span>
                                <div className="flex-grow border-t border-[var(--border)]"></div>
                            </div>

                            <button className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg font-semibold bg-[var(--background)] text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all shadow-md">
                                <span className="bg-[var(--background)] p-1.5 rounded-full"></span>
                                <span>Sign up with Google</span>
                            </button>
                        </>
                    )}

                    {/* Login link */}
                    <div className="text-center mt-4">
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Already have an account?{" "}
                            <a href={`/login${isEmployer ? "?role=employer" : "?role=seeker"}`} className="font-semibold text-[var(--primary)] hover:underline">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
