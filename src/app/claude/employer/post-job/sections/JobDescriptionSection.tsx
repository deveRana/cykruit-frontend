"use client";

import React, { useState } from "react";
import { FileText, AlertCircle, CheckCircle2, Lightbulb } from "lucide-react";
import { FieldValues, FieldErrors, UseFormRegister, UseFormWatch, Path } from "react-hook-form";

type JobDescriptionSectionProps<TFormValues extends FieldValues> = {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    watch: UseFormWatch<TFormValues>;
};

export default function JobDescriptionSection<TFormValues extends FieldValues>({
    register,
    errors,
    watch,
}: JobDescriptionSectionProps<TFormValues>) {
    const [showTips, setShowTips] = useState(false);
    const jobDescription = watch("jobDescription" as Path<TFormValues>) as string || "";

    const charCount = jobDescription.length;
    const minChars = 100;
    const maxChars = 5000;
    const isValid = charCount >= minChars && charCount <= maxChars;

    const getCharCountColor = () => {
        if (charCount === 0) return "text-gray-400";
        if (charCount < minChars) return "text-orange-500";
        if (charCount > maxChars) return "text-red-500";
        return "text-green-600";
    };

    const tips = [
        "Start with a compelling overview of the role and company",
        "List 5-7 key responsibilities using bullet points",
        "Specify required qualifications and preferred skills separately",
        "Mention growth opportunities and learning resources",
        "Include benefits, perks, and what makes your company unique",
        "Use clear, inclusive language that appeals to diverse candidates"
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                        <FileText className="w-5 h-5 text-blue-600 mr-2" />
                        <h2 className="text-xl font-bold text-gray-900">Job Description</h2>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowTips(!showTips)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                        <Lightbulb className="w-4 h-4" />
                        {showTips ? "Hide Tips" : "Writing Tips"}
                    </button>
                </div>
                <p className="text-gray-600 text-sm">
                    Provide a detailed description of the role, responsibilities, and requirements
                </p>
            </div>

            {/* Writing Tips */}
            {showTips && (
                <div className="mb-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="flex items-start mb-3">
                        <Lightbulb className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                        <h3 className="text-sm font-semibold text-gray-900">
                            Tips for a Great Job Description
                        </h3>
                    </div>
                    <ul className="space-y-2">
                        {tips.map((tip, index) => (
                            <li key={index} className="flex items-start text-sm text-gray-700">
                                <span className="text-blue-500 mr-2 mt-0.5">•</span>
                                <span>{tip}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Textarea */}
            <div className="flex flex-col">
                <label htmlFor="job-description" className="text-sm font-semibold text-gray-700 mb-2">
                    Description *
                </label>
                <div className="relative">
                    <textarea
                        id="job-description"
                        rows={12}
                        placeholder="Example:

About the Role
We're looking for a talented [Job Title] to join our growing team...

Key Responsibilities
• [Responsibility 1]
• [Responsibility 2]
• [Responsibility 3]

Required Qualifications
• [Qualification 1]
• [Qualification 2]

What We Offer
• [Benefit 1]
• [Benefit 2]"
                        className={`w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${errors.jobDescription
                                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                : "border-gray-300 hover:border-gray-400"
                            }`}
                        {...register("jobDescription" as Path<TFormValues>)}
                    />
                </div>

                {/* Character Count & Validation */}
                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                        {charCount >= minChars && charCount <= maxChars ? (
                            <div className="flex items-center text-green-600 text-sm">
                                <CheckCircle2 className="w-4 h-4 mr-1" />
                                <span className="font-medium">Good length</span>
                            </div>
                        ) : charCount > 0 && charCount < minChars ? (
                            <div className="flex items-center text-orange-500 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="font-medium">{minChars - charCount} more characters needed</span>
                            </div>
                        ) : charCount > maxChars ? (
                            <div className="flex items-center text-red-500 text-sm">
                                <AlertCircle className="w-4 h-4 mr-1" />
                                <span className="font-medium">{charCount - maxChars} characters over limit</span>
                            </div>
                        ) : null}
                    </div>
                    <span className={`text-sm font-medium ${getCharCountColor()}`}>
                        {charCount} / {maxChars}
                    </span>
                </div>

                {/* Error Message */}
                {errors.jobDescription && (
                    <div className="flex items-center mt-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        <p>{errors.jobDescription.message as string}</p>
                    </div>
                )}

                {/* Help Text */}
                {!errors.jobDescription && (
                    <p className="text-gray-500 text-sm mt-2">
                        Minimum {minChars} characters recommended for a comprehensive description.
                    </p>
                )}
            </div>

            {/* Quick Format Guide */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                    Suggested Structure:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-gray-600">
                    <div>
                        <span className="font-medium text-gray-900">1. Overview</span>
                        <p className="mt-1">Company & role intro</p>
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">2. Details</span>
                        <p className="mt-1">Responsibilities & requirements</p>
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">3. Benefits</span>
                        <p className="mt-1">Perks & opportunities</p>
                    </div>
                </div>
            </div>
        </div>
    );
}