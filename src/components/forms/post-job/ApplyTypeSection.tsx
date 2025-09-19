"use client";

import React from "react";
import {
    FieldErrors,
    UseFormRegister,
    Control,
    UseFormSetValue,
    useFieldArray,
} from "react-hook-form";
import { ApplyTypeEnum } from "@/features/employer/types/post-a-job";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import { Plus, Trash2 } from "lucide-react";

interface ApplyTypeSectionProps {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    applyType: ApplyTypeEnum | undefined;
    control: Control<JobFormData>;
    setValue: UseFormSetValue<JobFormData>;
}

export default function ApplyTypeSection({
    register,
    errors,
    applyType,
    control,
}: ApplyTypeSectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "screeningQuestions",
    });

    return (
        <div className="space-y-4">
            {/* Apply Type Dropdown */}
            <SelectField
                label="Apply Type"
                placeholder="Select apply type"
                register={register("applyType")}
                error={errors.applyType}
                options={Object.values(ApplyTypeEnum).map((type) => ({
                    value: type,
                    label: type.replace("_", " "),
                }))}
            />

            {/* External apply → show URL field */}
            {applyType === ApplyTypeEnum.EXTERNAL && (
                <InputField
                    label="Apply URL"
                    type="url"
                    placeholder="https://example.com/apply"
                    register={register("applyUrl")}
                    error={errors.applyUrl}
                />
            )}

            {/* Pre-screening → dynamic list of text questions */}
            {applyType === ApplyTypeEnum.PRE_SCREENING && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Screening Questions
                        </h3>
                        <button
                            type="button"
                            onClick={() => append({ question: "", type: "TEXT", options: [] })}
                            className="flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700 transition"
                        >
                            <Plus size={16} className="mr-2" />
                            Add Question
                        </button>
                    </div>

                    <div className="space-y-3">
                        {fields.map((field, idx) => (
                            <div
                                key={field.id}
                                className="relative p-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition"
                            >
                                {/* Remove Button */}
                                <button
                                    type="button"
                                    onClick={() => remove(idx)}
                                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                                    title="Remove question"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <InputField
                                    type="text"
                                    label={`Question ${idx + 1}`}
                                    placeholder="Enter a screening question"
                                    register={register(`screeningQuestions.${idx}.question`)}
                                    error={errors?.screeningQuestions?.[idx]?.question}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
