'use client';

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerSchema } from '@/lib/validators/auth.schema';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useMessageModal } from '@/components/common/MessageModal';
import { useRouter, useSearchParams } from 'next/navigation';
import { InputField } from '../forms/InputField';
import ButtonSpinner from '../common/button-spinner'; // <-- import it


type RegisterFormData = z.infer<typeof registerSchema>;

export const RegistrationForm: React.FC = () => {
    const [agreeToTerms, setAgreeToTerms] = useState(false);

    const searchParams = useSearchParams();
    const roleParam = searchParams.get("role") || "seeker";
    const isEmployer = roleParam === "employer";

    const { register: registerMutation } = useAuth();
    const messageModal = useMessageModal();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange',
        defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', role: 'seeker' },
    });

    const passwordValue = watch('password');

    const onSubmit = (data: RegisterFormData) => {
        if (!agreeToTerms) {
            messageModal.showMessage({
                type: 'error',
                title: 'Error',
                content: 'Please agree to the terms and conditions.'
            });
            return;
        }

        const payload = {
            email: data.email,
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role.toUpperCase() as 'SEEKER' | 'EMPLOYER',
        };

        registerMutation.mutate(payload, {
            onError: (errors: unknown) => {
                let message = 'Registration failed. Try again.';
                if (Array.isArray(errors)) {
                    const messages = (errors as any[]).map((err) => err.message).filter(Boolean);
                    if (messages.length > 0) message = messages.join('\n');
                } else if (errors instanceof Error && errors.message) {
                    message = errors.message;
                }
                messageModal.showMessage({ type: 'error', title: 'Error', content: message });
            },
            onSuccess: () => {
                messageModal.showMessage({
                    type: 'success',
                    title: 'Registered Successfully',
                    content: 'A verification mail has been sent to your registered email.',
                    size: 'sm',
                    onClose: () => {
                        router.push('/login');
                    }
                });
            },
        });
    };

    return (
        <div className="w-full lg:w-1/2 p-8 sm:p-8 lg:p-10 bg-white">
            <div className="w-full max-w-md mx-auto py-8 lg:py-12">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                    <p className="text-gray-600 text-sm">Join the leading cybersecurity job platform</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* First & Last Name */}
                    <div className="grid grid-cols-2 gap-3">
                        <InputField
                            label="First Name"
                            type="text"
                            placeholder="John"
                            icon={<User className="w-4 h-4" />}
                            register={register('firstName')}
                            error={errors.firstName}
                        />
                        <InputField
                            label="Last Name"
                            type="text"
                            placeholder="Doe"
                            icon={<User className="w-4 h-4" />}
                            register={register('lastName')}
                            error={errors.lastName}
                        />
                    </div>

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
                        placeholder="Create a password"
                        icon={<Lock className="w-4 h-4" />}
                        register={register('password')}
                        value={passwordValue}
                        showStrength
                        error={errors.password}
                    />

                    {/* Confirm Password */}
                    <InputField
                        label="Confirm Password"
                        type="password"
                        placeholder="Re-enter password"
                        icon={<Lock className="w-4 h-4" />}
                        register={register('confirmPassword')}
                        error={errors.confirmPassword}
                    />

                    {/* Terms */}
                    <div className="flex items-start space-x-2 pt-1">
                        <input
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={(e) => setAgreeToTerms(e.target.checked)}
                            className="w-3.5 h-3.5 mt-0.5 border-gray-300 rounded"
                            style={{ accentColor: '#0062FF' }}
                        />
                        <label className="text-xs text-gray-600">
                            I agree to the{' '}
                            <a href="#" className="font-semibold hover:underline" style={{ color: '#0062FF' }}>
                                Terms
                            </a>{' '}
                            and{' '}
                            <a href="#" className="font-semibold hover:underline" style={{ color: '#0062FF' }}>
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    {/* Submit - use ButtonSpinner */}
                    <ButtonSpinner
                        type="submit"
                        classes="w-full text-white py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm mt-3.5"
                        loading={registerMutation.isPending} // <-- change here
                        disabled={!isValid || registerMutation.isPending || !agreeToTerms}
                        variant="primary"
                    >
                        Create Account
                    </ButtonSpinner>
                </form>

                {/* Divider */}
                <div className="relative py-3">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-gray-500">Or sign up with</span>
                    </div>
                </div>

                {/* Google Sign-up for seekers only */}
                {!isEmployer && (
                    <button
                        type="button"
                        className="w-full bg-white border-2 border-gray-300 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 text-sm"
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Sign up with Google</span>
                    </button>
                )}

                {/* Sign In Link */}
                <div className="mt-5 text-center">
                    <p className="text-gray-600 text-sm">
                        Already have an account?{' '}
                        <a href={`/login${isEmployer ? "?role=employer" : "?role=seeker"}`} className="font-semibold hover:underline transition-colors" style={{ color: '#0062FF' }}>
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};
