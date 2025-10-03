"use client";

import React from "react";
import { Clock, Briefcase, Calendar, Timer } from "lucide-react";
import {
    FieldValues,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
    Path,
    PathValue,
} from "react-hook-form";

type EmploymentTypeSectionProps<TFormValues extends FieldValues> = {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
    watch: UseFormWatch<TFormValues>;
};

export default function EmploymentTypeSection<TFormValues extends FieldValues>({
    register,
    errors,
    setValue,
    watch,
}: EmploymentTypeSectionProps<TFormValues>) {
    const jobType = watch("jobType" as Path<TFormValues>) as string;
    const duration = watch("duration" as Path<TFormValues>) as string;
    const durationUnit = watch("durationUnit" as Path<TFormValues>) as string;

    const showDuration = ["Contract", "Part-time", "Internship"].includes(jobType || "");

    const jobTypeOptions = [
        {
            value: "Full-time",
            label: "Full-time",
            description: "40 hours per week, permanent position",
            icon: Briefcase,
        },
        {
            value: "Part-time",
            label: "Part-time",
            description: "Less than 40 hours per week",
            icon: Clock,
        },
        {
            value: "Contract",
            label: "Contract",
            description: "Fixed-term contract position",
            icon: Calendar,
        },
        {
            value: "Internship",
            label: "Internship",
            description: "Temporary learning position",
            icon: Timer,
        },
    ];

    const durationUnitOptions = [
        { value: "weeks", label: "Weeks" },
        { value: "months", label: "Months" },
        { value: "years", label: "Years" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-bold text-gray-900">Employment Type</h2>
                </div>
                <p className="text-gray-600 text-sm">
                    Define the type and duration of employment
                </p>
            </div>

            {/* Job Type Selection - Card Style */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Job Type *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {jobTypeOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() =>
                                    setValue(
                                        "jobType" as Path<TFormValues>,
                                        option.value as PathValue<
                                            TFormValues,
                                            Path<TFormValues>
                                        >,
                                        { shouldValidate: true }
                                    )
                                }
                                className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${jobType === option.value
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <Icon
                                    className={`w-6 h-6 mb-2 ${jobType === option.value
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                        }`}
                                />
                                <div
                                    className={`font-semibold mb-1 ${jobType === option.value
                                            ? "text-blue-900"
                                            : "text-gray-900"
                                        }`}
                                >
                                    {option.label}
                                </div>
                                <div className="text-xs text-gray-600">
                                    {option.description}
                                </div>
                            </button>
                        );
                    })}
                </div>
                {errors.jobType && (
                    <p className="text-red-500 text-sm mt-2">
                        {errors.jobType.message as string}
                    </p>
                )}
            </div>

            {/* Duration Fields - Show only for specific job types */}
            {showDuration && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                    <div className="flex items-center mb-4">
                        <Timer className="w-5 h-5 text-blue-600 mr-2" />
                        <h3 className="text-sm font-semibold text-gray-900">
                            Duration Details
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Duration Input */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Duration *
                            </label>
                            <input
                                type="number"
                                min={1}
                                value={duration || ""}
                                onChange={(e) =>
                                    setValue(
                                        "duration" as Path<TFormValues>,
                                        e.target.value as PathValue<
                                            TFormValues,
                                            Path<TFormValues>
                                        >,
                                        { shouldValidate: true }
                                    )
                                }
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                                placeholder="e.g., 6"
                            />
                            {errors.duration && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.duration.message as string}
                                </p>
                            )}
                        </div>

                        {/* Duration Unit Select */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Time Unit *
                            </label>
                            <div className="relative">
                                <select
                                    value={durationUnit || "months"}
                                    onChange={(e) =>
                                        setValue(
                                            "durationUnit" as Path<TFormValues>,
                                            e.target.value as PathValue<
                                                TFormValues,
                                                Path<TFormValues>
                                            >,
                                            { shouldValidate: true }
                                        )
                                    }
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white appearance-none cursor-pointer"
                                >
                                    {durationUnitOptions.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>
                            </div>
                            {errors.durationUnit && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.durationUnit.message as string}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Duration Preview */}
                    {duration && (
                        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Contract Duration:</span>{" "}
                                <span className="text-blue-600">
                                    {duration} {durationUnit}
                                </span>
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}