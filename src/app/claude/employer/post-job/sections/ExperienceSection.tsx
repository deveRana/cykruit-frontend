"use client";

import React from "react";
import {
    FieldValues,
    FieldErrors,
    Path,
    PathValue,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { Briefcase } from "lucide-react";

interface ExperienceSectionProps<TFormValues extends FieldValues> {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
    watch: UseFormWatch<TFormValues>;
}

export default function ExperienceSection<TFormValues extends FieldValues>({
    register,
    errors,
    setValue,
    watch,
}: ExperienceSectionProps<TFormValues>) {
    const selectedExperience = watch("experience" as Path<TFormValues>) as string;

    const experienceLevels = [
        { value: "fresher", label: "Fresher (0-1 years)" },
        { value: "junior", label: "Junior (1-3 years)" },
        { value: "mid", label: "Mid-level (3-5 years)" },
        { value: "senior", label: "Senior (5-8 years)" },
        { value: "lead", label: "Lead (8+ years)" },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6 flex items-center">
                <Briefcase className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Experience Level
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Select the required experience level for this position
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {experienceLevels.map((level) => (
                    <button
                        key={level.value}
                        type="button"
                        onClick={() =>
                            setValue(
                                "experience" as Path<TFormValues>,
                                level.value as PathValue<TFormValues, Path<TFormValues>>,
                                { shouldValidate: true }
                            )
                        }
                        className={`p-4 border-2 rounded-lg text-left transition-all ${selectedExperience === level.value
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <div className="font-semibold text-gray-900">
                            {level.label}
                        </div>
                    </button>
                ))}
            </div>

            {errors.experience && (
                <p className="text-red-500 text-sm mt-3">
                    {String(errors.experience.message)}
                </p>
            )}
        </div>
    );
}