'use client';

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useGoogleAuth } from "@/features/auth/hooks/googleAuth";
import { useMessageModal } from '@/components/common/MessageModal';
import { useSearchParams } from 'next/navigation';
import { InputField } from '../forms/InputField';
import ButtonSpinner from '../common/button-spinner';

// Define schema for login
const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const LoginForm: React.FC = () => {
    const searchParams = useSearchParams();
    const roleParam = searchParams.get('role') || 'seeker';
    const isEmployer = roleParam === 'employer';

    const { login } = useAuth();
    const messageModal = useMessageModal();
    const { startGoogleLogin } = useGoogleAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: { email: '', password: '' },
    });

    const onSubmit = (data: LoginFormData) => {
        login.mutate(
            { email: data.email, password: data.password },
            {
                onError: (err: any) => {
                    let message = 'Login failed. Try again.';
                    if (err instanceof Error) message = err.message;
                    messageModal.showMessage({ type: 'error', title: 'Error', content: message });
                },
                onSuccess: () => {
                    messageModal.showMessage({
                        type: 'success',
                        title: 'Login Successful',
                        content: 'Welcome back!',
                        size: 'sm',
                    });
                },
            }
        );
    };

    return (
        <div className="w-full lg:w-1/2 p-8 sm:p-8 lg:p-10 bg-white">
            <div className="w-full max-w-md mx-auto py-12 lg:py-20">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h2>
                    <p className="text-gray-600 text-sm">Access your account and continue your journey</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Email */}
                    <InputField
                        label="Email Address"
                        type="email"
                        placeholder="you@example.com"
                        icon={<Mail className="w-4 h-4" />}
                        register={register('email')}
                        error={errors.email}
                    />

                    {/* Password */}
                    <InputField
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        icon={<Lock className="w-4 h-4" />}
                        register={register('password')}
                        error={errors.password}
                    />

                    {/* Submit - USE login.isPending instead of isSubmitting */}
                    <ButtonSpinner
                        type="submit"
                        classes="w-full text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm mt-3.5"
                        loading={login.isPending}
                        disabled={!isValid || login.isPending}
                        variant="primary"
                    >
                        Sign In
                    </ButtonSpinner>
                </form>

                {/* Divider */}
                <div className="relative py-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-500">Or sign in with</span>
                    </div>
                </div>

                {/* Google Sign-in for seekers only */}
                {!isEmployer && (
                    <button
                        onClick={startGoogleLogin}
                        type="button"
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Sign in with Google</span>
                    </button>
                )}

                {/* Sign Up Link */}
                <div className="mt-5 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account?{' '}
                        <a href={`/register${isEmployer ? "?role=employer" : "?role=seeker"}`} className="font-semibold hover:underline transition-colors" style={{ color: '#0062FF' }}>
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};