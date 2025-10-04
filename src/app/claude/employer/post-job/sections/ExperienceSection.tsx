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
import { ExperienceLevelEnum } from "@/features/employer/types/post-a-job";

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
    const selectedExperience = watch("experience" as Path<TFormValues>) as ExperienceLevelEnum;

    const experienceLevels = [
        {
            value: ExperienceLevelEnum.ENTRY,
            label: "Entry Level (0-2 years)",
            description: "Recent graduates or professionals with minimal experience"
        },
        {
            value: ExperienceLevelEnum.MID,
            label: "Mid Level (2-5 years)",
            description: "Experienced professionals with proven track record"
        },
        {
            value: ExperienceLevelEnum.SENIOR,
            label: "Senior Level (5+ years)",
            description: "Seasoned experts with extensive industry experience"
        },
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        className={`p-5 border-2 rounded-lg text-left transition-all hover:shadow-md ${selectedExperience === level.value
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                    >
                        <div className={`font-semibold mb-2 ${selectedExperience === level.value
                                ? "text-blue-900"
                                : "text-gray-900"
                            }`}>
                            {level.label}
                        </div>
                        <div className="text-xs text-gray-600">
                            {level.description}
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