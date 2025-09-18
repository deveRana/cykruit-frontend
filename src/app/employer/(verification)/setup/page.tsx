"use client";

import React from "react";
import { motion } from "framer-motion";
import SetupForm from "./SetupForm";
import EmployerOnboardingGuard from "@/lib/auth/EmployerOnboardingGuard";
import Image from "next/image";

export default function EmployerSetupPage() {
    return (
        <EmployerOnboardingGuard>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--background)] to-[var(--accent)]/10 text-[var(--foreground)] p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl"
                >
                    <div className="w-full bg-white dark:bg-[var(--background)] rounded-2xl shadow-xl p-8 space-y-6">
                        {/* Logo */}
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <Image src="/assets/logo.svg" alt="Logo" width={40} height={40} />
                            <span className="text-2xl font-bold text-[var(--primary)]">
                                Setup Your Company
                            </span>
                        </div>

                        {/* Title */}
                        <div className="text-center space-y-2">
                            <h2 className="text-3xl font-bold">KYC Verification</h2>
                            <p className="text-sm text-[var(--muted-foreground)]">
                                Complete your company profile to proceed with KYC verification.
                            </p>
                        </div>

                        {/* KYC Form only */}
                        <SetupForm />
                    </div>
                </motion.div>
            </div>
        </EmployerOnboardingGuard>
    );
}
