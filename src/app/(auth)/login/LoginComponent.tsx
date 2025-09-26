"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthIllustration from "@/components/auth/AuthIllustration";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMessageModal } from "@/components/common/MessageModal";
import InputField from "@/components/forms/InputField";
import Image from "next/image";
import { useGoogleAuth } from "@/features/auth/hooks/googleAuth"; // ✅ import the hook
import Link from "next/link";
import { FaGoogle } from "react-icons/fa"

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginComponent() {
    const searchParams = useSearchParams();
    const role = searchParams.get("role") || "seeker";
    const isEmployer = role === "employer";

    const { login: loginMutation } = useAuth();
    const messageModal = useMessageModal();
    const { startGoogleLogin } = useGoogleAuth(); // ✅ use hook

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
    });

    const passwordValue = watch("password");

    const onSubmit = (data: LoginFormData) => {
        loginMutation.mutate(
            { email: data.email, password: data.password },
            {
                onError: (errors: unknown) => {
                    let errorMessage = "Login failed. Please try again.";
                    if (Array.isArray(errors) && errors.length > 0) {
                        const mainError = (errors as Array<{ field?: string; message?: string }>).find(
                            (err) => err.field === "message"
                        );
                        if (mainError?.message) errorMessage = mainError.message;
                        else if (errors[0]?.message) errorMessage = errors[0].message;
                    } else if (errors instanceof Error && errors.message) {
                        errorMessage = errors.message;
                    }
                    messageModal.showMessage("error", errorMessage);
                },
                onSuccess: () => {
                    reset();
                    messageModal.showMessage("success", "Logged in successfully!");
                },
            }
        );
    };

    return (
        <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--background)] text-[var(--foreground)]">
            <AuthIllustration urlPath="/login" className="w-1/2" />

            <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-4">
                    <Link href={"/"} className="flex items-center justify-center gap-2 mb-6">
                        <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                        <span className="text-2xl font-bold text-[var(--primary)]">Cykruit</span>
                    </Link>

                    <div className="text-left space-y-2">
                        <h2 className="text-3xl font-bold text-[var(--foreground)]">Sign In</h2>
                        <p className="text-sm text-[var(--muted-foreground)]">
                            Welcome back! Choose your preferred sign-in method.
                        </p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <InputField
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            register={register("email")}
                            error={errors.email}
                        />
                        <InputField
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            register={register("password")}
                            error={errors.password}
                            value={passwordValue}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-[var(--primary)] rounded" />
                                <span className="text-[var(--muted-foreground)]">Remember me</span>
                            </label>
                            <a
                                href="/forgot-password"
                                className="text-[var(--primary)] font-medium hover:underline"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid || loginMutation.isPending}
                            className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${isValid && !loginMutation.isPending
                                ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {loginMutation.isPending ? "Loading..." : "Sign In"}
                        </button>
                    </form>

                    {!isEmployer && (
                        <>
                            <div className="flex items-center my-6">
                                <div className="flex-grow border-t border-[var(--border)]"></div>
                                <span className="mx-3 text-sm text-[var(--muted-foreground)] bg-[var(--background)] px-2 z-10">
                                    Or sign in with Google
                                </span>
                                <div className="flex-grow border-t border-[var(--border)]"></div>
                            </div>

                            {/* ✅ Google login button */}
                            <button
                                onClick={startGoogleLogin}
                                className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-lg font-semibold bg-[var(--background)] text-[var(--primary)] border border-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition-all shadow-md"
                            >
                                <FaGoogle />
                                <span>Sign in with Google</span>
                            </button>
                        </>
                    )}

                    <div className="text-center mt-4">
                        <p className="text-sm text-[var(--muted-foreground)]">
                            New here? Create an account{" "}
                            <a
                                href={`/signup${isEmployer ? "?role=employer" : "?role=seeker"}`}
                                className="font-semibold text-[var(--primary)] hover:underline"
                            >
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
