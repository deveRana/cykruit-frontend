"use client";

import React, { useState } from "react";
import { Save, Send } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmployerJobs } from "@/features/employer/hooks/useEmployerJobs";
import { CreateJobInput, JobStatusEnum } from "@/features/employer/types/post-a-job";

import PostJobHeader from "./PostJobHeader";
import BasicInformationSection from "./sections/BasicInformationSection";
import WorkDetailsSection from "./sections/WorkDetailsSection";
import EmploymentTypeSection from "./sections/EmploymentTypeSection";
import JobDescriptionSection from "./sections/JobDescriptionSection";
import ExperienceSection from "./sections/ExperienceSection";
import ApplyTypeSection from "./sections/ApplyTypeSection";
import { SkillsSection } from "./sections/SkillsSection";
import { CertificationsSection } from "./sections/CertificationsSection";

// ---------------------- Zod Schema ----------------------
const jobSchema = z
    .object({
        title: z.string().min(3, "Job title is required"),
        roleId: z.string().min(1, "Role is required"),
        workMode: z.string().min(1, "Work mode is required"),
        location: z.any().nullable().optional(),
        jobType: z.string().min(1, "Job type is required"),
        duration: z.string().optional(),
        durationUnit: z.string().optional(),
        jobDescription: z.string().min(10, "Job description is required"),
        selectedCertifications: z.array(z.string()).optional(),
        selectedSkills: z.array(z.string()).optional(),
        experience: z.string().min(1, "Experience level is required"),
        applyType: z.string().min(1, "Application type is required"),
        applyUrl: z.string().optional(),
        screeningQuestions: z.array(z.string()).optional(),
    })
    .refine(
        (data) => {
            if (data.applyType === "external") {
                return (
                    data.applyUrl &&
                    data.applyUrl.length > 0 &&
                    /^https?:\/\/.+/.test(data.applyUrl)
                );
            }
            return true;
        },
        {
            message: "Valid application URL is required for external applications",
            path: ["applyUrl"],
        }
    )
    .refine(
        (data) => {
            if (data.applyType === "pre-screening") {
                return (
                    data.screeningQuestions &&
                    data.screeningQuestions.length > 0 &&
                    data.screeningQuestions.some((q) => q.trim().length > 0)
                );
            }
            return true;
        },
        {
            message: "At least one screening question is required",
            path: ["screeningQuestions"],
        }
    );

export type JobFormData = z.infer<typeof jobSchema>;

// ---------------------- Component ----------------------
const PostJobForm = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const { createJobMutation } = useEmployerJobs();

    const methods = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            roleId: "",
            workMode: "",
            location: null,
            jobType: "",
            duration: "",
            durationUnit: "months",
            jobDescription: "",
            selectedCertifications: [],
            selectedSkills: [],
            experience: "",
            applyType: "",
            applyUrl: "",
            screeningQuestions: [],
        },
        mode: "onChange",
    });

    const {
        handleSubmit,
        formState: { errors, isValid },
        register,
        setValue,
        watch,
    } = methods;

    // Count errors
    const errorCount = Object.keys(errors).length;

    const onSaveDraft = async (data: JobFormData) => {
        setIsSaving(true);
        try {
            const jobData: CreateJobInput = {
                title: data.title,
                roleId: data.roleId,
                workMode: data.workMode,
                location: data.location,
                employmentType: data.jobType,
                duration: data.duration,
                durationUnit: data.durationUnit || "months",
                description: data.jobDescription,
                certifications: data.selectedCertifications,
                skills: data.selectedSkills,
                experience: data.experience,
                applyType: data.applyType,
                applyUrl: data.applyUrl,
                screeningQuestions: data.screeningQuestions,
                status: JobStatusEnum.DRAFT,
            };

            await createJobMutation.mutateAsync(jobData);
            alert("Job saved as draft!");
        } catch (error) {
            console.error("Error saving draft:", error);
            alert("Error saving draft");
        } finally {
            setIsSaving(false);
        }
    };

    const onPublish = async (data: JobFormData) => {
        setIsPublishing(true);
        try {
            const jobData: CreateJobInput = {
                title: data.title,
                roleId: data.roleId,
                workMode: data.workMode,
                location: data.location,
                employmentType: data.jobType,
                duration: data.duration,
                durationUnit: data.durationUnit || "months",
                description: data.jobDescription,
                certifications: data.selectedCertifications,
                skills: data.selectedSkills,
                experience: data.experience,
                applyType: data.applyType,
                applyUrl: data.applyUrl,
                screeningQuestions: data.screeningQuestions,
                status: JobStatusEnum.ACTIVE,
            };

            await createJobMutation.mutateAsync(jobData);
            alert("Job published successfully!");
        } catch (error) {
            console.error("Error publishing job:", error);
            alert("Error publishing job");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <>
            <PostJobHeader />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <FormProvider {...methods}>
                    <form className="space-y-6">
                        {/* Basic Information Section */}
                        <BasicInformationSection<JobFormData>
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                        {/* Employment Type Section */}
                        <EmploymentTypeSection<JobFormData>
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                        {/* Work Details Section */}
                        <WorkDetailsSection<JobFormData>
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                        {/* Experience Section */}
                        <ExperienceSection<JobFormData>
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                        {/* Job Description Section */}
                        <JobDescriptionSection<JobFormData>
                            register={register}
                            errors={errors}
                            watch={watch}
                        />

                        {/* Skills Section */}
                        <SkillsSection<JobFormData>
                            watch={watch}
                            setValue={setValue}
                        />

                        {/* Certifications Section */}
                        <CertificationsSection<JobFormData>
                            watch={watch}
                            setValue={setValue}
                        />

                        {/* Apply Type Section */}
                        <ApplyTypeSection<JobFormData>
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            watch={watch}
                        />

                        {/* Action Buttons */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 z-10">
                            <div className="flex flex-col sm:flex-row gap-4 justify-end items-center">
                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={handleSubmit(onSaveDraft)}
                                        disabled={isSaving}
                                        className="flex items-center justify-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isSaving ? "Saving..." : "Save as Draft"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSubmit(onPublish)}
                                        disabled={!isValid || isPublishing}
                                        className={`flex items-center justify-center px-6 py-3 rounded-lg transition-all font-medium shadow-lg ${isValid && !isPublishing
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105"
                                            : "bg-gray-400 text-white cursor-not-allowed"
                                            }`}
                                    >
                                        {isPublishing ? (
                                            <>
                                                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                Publishing...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Publish Job
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Validation Errors List */}
                            {!isValid && errorCount > 0 && (
                                <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
                                    <p className="text-sm font-semibold text-red-900 mb-2">
                                        Please fix the following errors:
                                    </p>
                                    <ul className="space-y-1 text-sm text-red-700">
                                        {Object.entries(errors).map(([field, error]) => (
                                            <li key={field} className="flex items-start">
                                                <span className="text-red-500 mr-2">•</span>
                                                <span>
                                                    <span className="font-medium capitalize">
                                                        {field.replace(/([A-Z])/g, ' $1').trim()}:
                                                    </span>{" "}
                                                    {error.message as string}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </main>
        </>
    );
};

export default PostJobForm;