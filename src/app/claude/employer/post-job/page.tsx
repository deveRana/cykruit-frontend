"use client";

import React, { useState } from "react";
import { Save, Send } from "lucide-react";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEmployerJobs } from "@/features/employer/hooks/useEmployerJobs";
import {
    CreateJobInput,
    JobStatusEnum,
    WorkModeEnum,
    ApplyTypeEnum,
    EmploymentTypeEnum,
    ExperienceLevelEnum,
    QuestionTypeEnum,
    ScreeningQuestionInput
} from "@/features/employer/types/post-a-job";

import PostJobHeader from "./PostJobHeader";
import BasicInformationSection from "./sections/BasicInformationSection";
import WorkDetailsSection from "./sections/WorkDetailsSection";
import EmploymentTypeSection from "./sections/EmploymentTypeSection";
import JobDescriptionSection from "./sections/JobDescriptionSection";
import ExperienceSection from "./sections/ExperienceSection";
import ApplyTypeSection from "./sections/ApplyTypeSection";
import { SkillsSection } from "./sections/SkillsSection";
import { CertificationsSection } from "./sections/CertificationsSection";
import { useMessageModal } from "@/components/common/MessageModal";

// ---------------------- Zod Schema ----------------------
const jobSchema = z
    .object({
        title: z.string().min(3, "Job title is required"),
        roleId: z.string().min(1, "Role is required"),
        workMode: z.string().min(1, "Work mode is required"),
        location: z.any().nullable().optional(),
        jobType: z.string().min(1, "Employment type is required"),
        contractDurationInMonths: z.number().positive().optional().nullable(),
        jobDescription: z.string().min(10, "Job description is required"),
        selectedCertifications: z.array(z.number()).optional(),
        selectedSkills: z.array(z.number()).optional(),
        experience: z.string().min(1, "Experience level is required"),
        applyType: z.string().min(1, "Application type is required"),
        applyUrl: z.string().optional().nullable(),
        screeningQuestions: z.array(z.object({
            question: z.string(),
            type: z.string(),
            options: z.array(z.string()).optional(),
            required: z.boolean()
        })).optional(),
    })
    .refine(
        (data) => {
            // Location required for ONSITE and HYBRID
            if (data.workMode === WorkModeEnum.ONSITE || data.workMode === WorkModeEnum.HYBRID) {
                return data.location !== null && data.location !== undefined;
            }
            return true;
        },
        {
            message: "Location is required for on-site and hybrid positions",
            path: ["location"],
        }
    )
    .refine(
        (data) => {
            // Location should be null for REMOTE
            if (data.workMode === WorkModeEnum.REMOTE) {
                return data.location === null || data.location === undefined;
            }
            return true;
        },
        {
            message: "Remote positions cannot have a location",
            path: ["location"],
        }
    )
    .refine(
        (data) => {
            // Apply URL required for EXTERNAL
            if (data.applyType === ApplyTypeEnum.EXTERNAL) {
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
            // Apply URL should be empty for DIRECT and PRE_SCREENING
            if (data.applyType === ApplyTypeEnum.DIRECT || data.applyType === ApplyTypeEnum.PRE_SCREENING) {
                return !data.applyUrl || data.applyUrl.length === 0;
            }
            return true;
        },
        {
            message: "Only external applications can have an apply URL",
            path: ["applyUrl"],
        }
    )
    .refine(
        (data) => {
            // Screening questions required for PRE_SCREENING
            if (data.applyType === ApplyTypeEnum.PRE_SCREENING) {
                return (
                    data.screeningQuestions &&
                    data.screeningQuestions.length > 0
                );
            }
            return true;
        },
        {
            message: "At least one screening question is required for pre-screening applications",
            path: ["screeningQuestions"],
        }
    )
    .refine(
        (data) => {
            // Contract duration required for CONTRACT
            if (data.jobType === EmploymentTypeEnum.CONTRACT) {
                return data.contractDurationInMonths && data.contractDurationInMonths > 0;
            }
            return true;
        },
        {
            message: "Contract duration is required for contract positions",
            path: ["contractDurationInMonths"],
        }
    );

export type JobFormData = z.infer<typeof jobSchema>;

// ---------------------- Component ----------------------
const PostJobPage = () => {
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);

    const { createJobMutation } = useEmployerJobs();
    const messageModal = useMessageModal();

    const methods = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            title: "",
            roleId: "",
            workMode: "",
            location: null,
            jobType: "",
            contractDurationInMonths: null,
            jobDescription: "",
            selectedCertifications: [],
            selectedSkills: [],
            experience: "",
            applyType: "",
            applyUrl: null,
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

    const transformFormDataToAPI = (data: JobFormData): CreateJobInput => {
        return {
            title: data.title,
            roleId: parseInt(data.roleId),
            workMode: data.workMode as WorkModeEnum,
            location: data.location ? {
                city: data.location.city,
                state: data.location.state,
                country: data.location.country,
                fullAddress: data.location.fullAddress,
            } : null,
            employmentType: data.jobType as EmploymentTypeEnum,
            contractDurationInMonths: data.contractDurationInMonths,
            description: data.jobDescription,
            certifications: data.selectedCertifications,
            skills: data.selectedSkills,
            experience: data.experience as ExperienceLevelEnum,
            applyType: data.applyType as ApplyTypeEnum,
            applyUrl: data.applyUrl || null,
            screeningQuestions: data.screeningQuestions as ScreeningQuestionInput[],
        };
    };

    const onSaveDraft = async (data: JobFormData) => {
        setIsSaving(true);
        try {
            const jobData = transformFormDataToAPI(data);
            jobData.status = JobStatusEnum.DRAFT;

            await createJobMutation.mutateAsync(jobData);
            messageModal.showMessage({ type: "success", title: "Job saved as draft!", content: "Your job has been saved as a draft and can be edited later.", onClose: () => { window.location.href = "/claude/employer/jobs" } });

        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || "Error saving draft";
            messageModal.showMessage({
                type: "error", title: "Error saving draft", content: errorMessage, onClose() {
                    window.location.reload();
                },
            });
        } finally {
            setIsSaving(false);
        }
    };

    const onPublish = async (data: JobFormData) => {
        setIsPublishing(true);
        try {
            const jobData = transformFormDataToAPI(data);
            jobData.status = JobStatusEnum.ACTIVE;

            await createJobMutation.mutateAsync(jobData);
            messageModal.showMessage({ type: "success", title: "Job published successfully!", content: "Your job has been published and is now visible to candidates.", onClose: () => { window.location.href = "/claude/employer/jobs" } });
        } catch (error: any) {
            console.error("Error publishing job:", error);
            const errorMessage = error?.response?.data?.message || "Error publishing job";
            messageModal.showMessage({
                type: "error", title: "Error publishing job", content: errorMessage, onClose() {
                    window.location.reload();
                },
            });
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <>
            <PostJobHeader />
            <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

                        <div className="flex flex-row w-full gap-4">
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
                        </div>

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
                                                        {field.replace(/([A-Z])/g, " $1").trim()}:
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

export default PostJobPage;