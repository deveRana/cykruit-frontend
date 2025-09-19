"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { usePostJob } from "@/features/employer/hooks/usePostJob";
import { useScreeningQuestions } from "@/features/employer/hooks/useScreeningQuestions";
import { useMessageModal } from "@/components/common/MessageModal";
import {
    ApplyTypeEnum,
    EmploymentTypeEnum,
    ExperienceLevelEnum,
    WorkModeEnum,
} from "@/features/employer/types/post-a-job";

// Components
import JobTitleRoleRow from "@components/forms/post-job/JobTitleRoleRow";
import JobTypeDurationRow from "@components/forms/post-job/JobTypeDurationRow";
import WorkModeLocationRow from "@components/forms/post-job/WorkModeLocationRow";
import ExperienceDescriptionRow from "@components/forms/post-job/ExperienceDescriptionRow";
import CertificationsSkillsRow from "@components/forms/post-job/CertificationsSkillsRow";
import ApplyTypeSection from "@components/forms/post-job/ApplyTypeSection";

export const jobSchema = z.object({
    title: z.string().min(3, "Title is required"),
    roleId: z.string(),
    workMode: z.nativeEnum(WorkModeEnum),
    locationId: z.number().optional(),
    employmentType: z.nativeEnum(EmploymentTypeEnum),
    contractDurationInMonths: z.number().optional(),
    experience: z.nativeEnum(ExperienceLevelEnum),
    description: z.string().min(10, "Description is required"),
    applyType: z.nativeEnum(ApplyTypeEnum),
    applyUrl: z.string().url().optional(),
    certifications: z.array(z.string()).optional(),
    skills: z.array(z.string()).optional(),
    screeningQuestions: z
        .array(
            z.object({
                question: z.string(),
                type: z.enum(["TEXT", "MULTIPLE_CHOICE", "CHECKBOX", "RADIO"]),
                options: z.array(z.string()).optional(),
            })
        )
        .optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;

export default function PostJobForm({ jobId }: { jobId?: string | number }) {
    const messageModal = useMessageModal();
    const { createJobMutation, updateJobMutation } = usePostJob();
    const { questions } = useScreeningQuestions(jobId);

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isValid },
        reset,
    } = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            roleId: "",
            workMode: WorkModeEnum.REMOTE,
            locationId: undefined,
            employmentType: EmploymentTypeEnum.FULL_TIME,
            contractDurationInMonths: undefined,
            experience: ExperienceLevelEnum.ENTRY,
            description: "",
            applyType: ApplyTypeEnum.DIRECT,
            applyUrl: "",
            certifications: [],
            skills: [],
            screeningQuestions: [],
        },
    });

    const workMode = watch("workMode");
    const employmentType = watch("employmentType");
    const applyType = watch("applyType");

    // Populate form with existing questions from API
    useEffect(() => {
        if (questions) {
            reset({
                title: "",
                roleId: "",
                workMode: WorkModeEnum.REMOTE,
                locationId: undefined,
                employmentType: EmploymentTypeEnum.FULL_TIME,
                contractDurationInMonths: undefined,
                experience: ExperienceLevelEnum.ENTRY,
                description: "",
                applyType: ApplyTypeEnum.DIRECT,
                applyUrl: "",
                certifications: [],
                skills: [],
                screeningQuestions: questions.map((q) => ({
                    ...q,
                    options: q.options || [],
                })),
            });
        }
    }, [questions, reset]);

    const onSubmit = (data: JobFormData) => {
        if (jobId) {
            updateJobMutation.mutate(
                { jobId, data },
                {
                    onSuccess: () =>
                        messageModal.showMessage("success", "Job updated successfully!"),
                    onError: () =>
                        messageModal.showMessage("error", "Failed to update job."),
                }
            );
        } else {
            createJobMutation.mutate(data, {
                onSuccess: () => {
                    messageModal.showMessage("success", "Job created successfully!");
                    reset();
                },
                onError: () => messageModal.showMessage("error", "Failed to create job."),
            });
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <JobTitleRoleRow register={register} errors={errors} setValue={setValue} />

                <JobTypeDurationRow
                    register={register}
                    errors={errors}
                    employmentType={employmentType}
                />

                <WorkModeLocationRow register={register} errors={errors} workMode={workMode} />

                <ExperienceDescriptionRow register={register} errors={errors} />

                <CertificationsSkillsRow
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                />

                <ApplyTypeSection
                    register={register}
                    errors={errors}
                    applyType={applyType}
                    control={control}
                    setValue={setValue}
                />

                <button
                    type="submit"
                    disabled={!isValid || createJobMutation.isPending || updateJobMutation.isPending}
                    className={`w-full py-3 rounded-xl font-semibold mt-4 transition-all ${isValid
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {jobId ? "Update Job" : "Create Job"}
                </button>
            </form>
        </div>
    );
}
