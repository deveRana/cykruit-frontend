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
import { MousePointer, ExternalLink, FileQuestion, Plus, X } from "lucide-react";

interface ApplyTypeSectionProps<TFormValues extends FieldValues> {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
    watch: UseFormWatch<TFormValues>;
}

export default function ApplyTypeSection<TFormValues extends FieldValues>({
    register,
    errors,
    setValue,
    watch,
}: ApplyTypeSectionProps<TFormValues>) {
    const applyType = watch("applyType" as Path<TFormValues>) as string;
    const screeningQuestions = (watch("screeningQuestions" as Path<TFormValues>) as string[]) || [];

    const applyTypes = [
        {
            value: "direct",
            label: "Direct Application",
            description: "Candidates apply directly through your platform",
            icon: MousePointer,
        },
        {
            value: "external",
            label: "External URL",
            description: "Redirect candidates to an external application page",
            icon: ExternalLink,
        },
        {
            value: "pre-screening",
            label: "Pre-screening Questions",
            description: "Ask candidates screening questions before applying",
            icon: FileQuestion,
        },
    ];

    const addQuestion = () => {
        const newQuestions = [...screeningQuestions, ""];
        setValue(
            "screeningQuestions" as Path<TFormValues>,
            newQuestions as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    const removeQuestion = (index: number) => {
        const newQuestions = screeningQuestions.filter((_, i) => i !== index);
        setValue(
            "screeningQuestions" as Path<TFormValues>,
            newQuestions as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    const updateQuestion = (index: number, value: string) => {
        const newQuestions = [...screeningQuestions];
        newQuestions[index] = value;
        setValue(
            "screeningQuestions" as Path<TFormValues>,
            newQuestions as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                    Application Type
                </h2>
                <p className="text-gray-600 text-sm">
                    Choose how candidates will apply for this position
                </p>
            </div>

            {/* Apply Type Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {applyTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                        <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                                setValue(
                                    "applyType" as Path<TFormValues>,
                                    type.value as PathValue<TFormValues, Path<TFormValues>>,
                                    { shouldValidate: true }
                                )
                            }
                            className={`p-5 border-2 rounded-lg text-left transition-all ${applyType === type.value
                                    ? "border-blue-600 bg-blue-50"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                        >
                            <Icon
                                className={`w-6 h-6 mb-3 ${applyType === type.value
                                        ? "text-blue-600"
                                        : "text-gray-400"
                                    }`}
                            />
                            <div className="font-semibold text-gray-900 mb-1">
                                {type.label}
                            </div>
                            <div className="text-sm text-gray-600">
                                {type.description}
                            </div>
                        </button>
                    );
                })}
            </div>

            {errors.applyType && (
                <p className="text-red-500 text-sm mb-4">
                    {String(errors.applyType.message)}
                </p>
            )}

            {/* External URL Input */}
            {applyType === "external" && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Application URL *
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/apply"
                        {...register("applyUrl" as Path<TFormValues>)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                    {errors.applyUrl && (
                        <p className="text-red-500 text-sm mt-2">
                            {String(errors.applyUrl.message)}
                        </p>
                    )}
                    <p className="text-gray-600 text-sm mt-2">
                        Candidates will be redirected to this URL to complete their
                        application
                    </p>
                </div>
            )}

            {/* Pre-screening Questions */}
            {applyType === "pre-screening" && (
                <div className="mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                        <label className="block text-sm font-semibold text-gray-700">
                            Screening Questions
                        </label>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                        >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Question
                        </button>
                    </div>

                    {screeningQuestions.length === 0 && (
                        <p className="text-gray-500 text-sm italic">
                            No questions added yet. Click "Add Question" to create
                            screening questions.
                        </p>
                    )}

                    <div className="space-y-3">
                        {screeningQuestions.map((question, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="flex-1">
                                    <input
                                        type="text"
                                        placeholder={`Question ${index + 1}`}
                                        value={question}
                                        onChange={(e) =>
                                            updateQuestion(index, e.target.value)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeQuestion(index)}
                                    className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>

                    {errors.screeningQuestions && (
                        <p className="text-red-500 text-sm mt-3">
                            {String(errors.screeningQuestions.message)}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}