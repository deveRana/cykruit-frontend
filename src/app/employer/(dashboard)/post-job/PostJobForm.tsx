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
    ScreeningQuestionInput,
    WorkModeEnum,
} from "@/features/employer/types/post-a-job";

// Components
import JobTitleRoleRow from "@components/forms/post-job/JobTitleRoleRow";
import JobTypeDurationRow from "@components/forms/post-job/JobTypeDurationRow";
import WorkModeLocationRow from "@components/forms/post-job/WorkModeLocationRow";
import ExperienceDescriptionRow from "@components/forms/post-job/ExperienceDescriptionRow";
import CertificationsSkillsRow from "@components/forms/post-job/CertificationsSkillsRow";
import ApplyTypeSection from "@components/forms/post-job/ApplyTypeSection";

// ---------------------- Zod Schema ----------------------
export const jobSchema = z
    .object({
        title: z.string().min(3, "Title is required"),
        roleId: z.string(),
        workMode: z.nativeEnum(WorkModeEnum),
        locationId: z.string(),
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
    })
    .refine(
        (data) =>
            data.applyType !== ApplyTypeEnum.EXTERNAL || (!!data.applyUrl && data.applyUrl.trim() !== ""),
        {
            message: "Apply URL is required for external applications",
            path: ["applyUrl"],
        }
    );

export type JobFormData = z.infer<typeof jobSchema>;

// ---------------------- Form Component ----------------------
export default function PostJobForm() {
    const messageModal = useMessageModal();
    const { createJobMutation } = usePostJob();
    const { questions } = useScreeningQuestions();

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
        reset,
        trigger,
    } = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        mode: "onSubmit", // <-- validate only on submit
        defaultValues: {
            title: "",
            roleId: "",
            workMode: WorkModeEnum.REMOTE,
            locationId: "",
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

    // Populate form with screening questions if available
    useEffect(() => {
        if (questions) {
            reset({
                title: "",
                roleId: "",
                workMode: WorkModeEnum.REMOTE,
                locationId: "",
                employmentType: EmploymentTypeEnum.FULL_TIME,
                contractDurationInMonths: undefined,
                experience: ExperienceLevelEnum.ENTRY,
                description: "",
                applyType: ApplyTypeEnum.DIRECT,
                applyUrl: "",
                certifications: [],
                skills: [],
                screeningQuestions: questions.map((q: ScreeningQuestionInput) => ({
                    ...q,
                    options: q.options || [],
                })),
            });
        }
    }, [questions, reset]);

    // Re-validate applyUrl only when applyType changes
    useEffect(() => {
        trigger("applyUrl");
    }, [applyType, trigger]);

    const onSubmit = (data: JobFormData) => {
        const formattedData = {
            ...data,
            roleId: Number(data.roleId),
            locationId: Number(data.locationId),
            certifications: data.certifications?.map(Number),
            skills: data.skills?.map(Number),
        };

        createJobMutation.mutate(formattedData, {
            onSuccess: () => {
                messageModal.showMessage("success", "Job created successfully!");
                reset();
            },
            onError: () => messageModal.showMessage("error", "Failed to create job."),
        });
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <JobTitleRoleRow register={register} errors={errors} setValue={setValue} />
                <JobTypeDurationRow register={register} errors={errors} employmentType={employmentType} />
                <WorkModeLocationRow register={register} errors={errors} workMode={workMode} setValue={setValue} />
                <ExperienceDescriptionRow register={register} errors={errors} />
                <CertificationsSkillsRow register={register} errors={errors} setValue={setValue} watch={watch} />

                <ApplyTypeSection
                    register={register}
                    errors={errors}
                    applyType={applyType}
                    control={control}
                    setValue={setValue}
                    watch={watch}
                />

                <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-semibold mt-4 transition-all bg-indigo-600 text-white hover:bg-indigo-700"
                >
                    Create Job
                </button>
            </form>
        </div>
    );
}
