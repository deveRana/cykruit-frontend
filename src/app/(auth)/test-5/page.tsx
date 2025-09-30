"use client";

import React from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle, ArrowRight, User } from 'lucide-react';
import { RegistrationForm } from '@/components/auth/registration-form';
import { RegisterBranding } from '@/components/auth/register-branding-page';

export default function ModernRegistrationPage() {
    const features = ['AI-powered job matching', 'Real-time application tracking', 'Direct employer messaging'];
    const stats = [
        { number: '10K+', label: 'Active Jobs' },
        { number: '5K+', label: 'Companies' },
        { number: '50K+', label: 'Job Seekers' },
    ];

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
                {/* Remove the wrapper div and let LeftSideBranding handle its own layout */}
                <RegisterBranding
                    title="Start Your Cybersecurity Career"
                    description="Join thousands of professionals who found their dream jobs through our platform."
                    features={features}
                    stats={stats}
                />

                <RegistrationForm />
            </div>
        </div>
    );
}
