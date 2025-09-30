"use client";

import React from 'react';
import { Mail, Lock, Eye, EyeOff, Shield, CheckCircle, ArrowRight, User } from 'lucide-react';
import { LoginBranding } from '@/components/auth/login-branding';
import { LoginForm } from '@/components/auth/login-form';

export default function ModernLoginPage() {
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
        </div>
    );
}
