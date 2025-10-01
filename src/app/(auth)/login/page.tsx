"use client";

import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoginBranding } from '@/components/auth/login-branding';
import { LoginForm } from '@/components/auth/login-form';
import Loader from '@/components/common/loader';

export default function ModernLoginPage() {
    const router = useRouter();
    const { user, isMeLoading } = useAuth();

    const features = [
        'AI-powered job recommendations',
        'Real-time application tracking',
        'Direct messaging with top employers'
    ];

    const stats = [
        { number: '15K+', label: 'Active Job Listings' },
        { number: '7K+', label: 'Hiring Companies' },
        { number: '100K+', label: 'Registered Job Seekers' },
    ];

    // Immediate redirect - no fade needed
    useEffect(() => {
        if (!isMeLoading && user) {
            const redirectUrl = user.role === "EMPLOYER"
                ? "/employer/dashboard"
                : "/dashboard";
            router.replace(redirectUrl);
        }
    }, [user, isMeLoading, router]);

    // Show loader during check OR if user exists (redirecting)
    if (isMeLoading || user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader />
            </div>
        );
    }

    // Only render if definitely logged out
    return (
        <div className="bg-gray-50 relative min-h-screen">
            <a
                href="/"
                className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors group z-40"
            >
                <span className="font-medium hidden sm:inline">Back to Home</span>
                <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 group-hover:shadow-md transition-all">
                    <ArrowRight className="w-5 h-5" />
                </div>
            </a>

            <div className="w-full min-h-screen bg-white shadow-lg overflow-hidden flex flex-col lg:flex-row">
                <LoginBranding
                    title="Find Your Dream Job Today"
                    description="Connect with top companies and land your next career opportunity effortlessly."
                    features={features}
                    stats={stats}
                />

                <LoginForm />
            </div>
        </div >
    );
}