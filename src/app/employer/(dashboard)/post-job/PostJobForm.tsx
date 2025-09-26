"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEmployerJobs } from "@/features/employer/hooks/useEmployerJobs";
import { useMasterData } from "@/features/employer/hooks/useMasterData";
import { useScreeningQuestions } from "@/features/employer/hooks/useScreeningQuestions";
import { useMessageModal } from "@/components/common/MessageModal";
import {
    ApplyTypeEnum,
    CreateJobInput,
    EmploymentTypeEnum,
    ExperienceLevelEnum,
    JobStatusEnum, // Imported JobStatusEnum
    LocationInput,
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
        locationId: z.string().optional(),
        employmentType: z.nativeEnum(EmploymentTypeEnum),
        contractDurationInMonths: z.number().optional(),
        experience: z.nativeEnum(ExperienceLevelEnum),
        status: z.nativeEnum(JobStatusEnum), // Added status to the schema
        description: z.string().min(10, "Description is required"),
        applyType: z.nativeEnum(ApplyTypeEnum),
        applyUrl: z.string().optional(),
        certifications: z.array(z.string()).optional(),
        skills: z.array(z.string()).optional(),
        screeningQuestions: z
            .array(
                z.object({
                    question: z.string().min(1, "Question cannot be empty"),
                    type: z.enum(["SINGLE_CHOICE", "MULTIPLE_CHOICE", "SHORT_ANSWER"]),
                    options: z.array(z.string()).optional(),
                })
            )
            .optional(),
    })
    .superRefine((data, ctx) => {
        if (data.applyType === ApplyTypeEnum.EXTERNAL) {
            if (!data.applyUrl || data.applyUrl.trim() === "") {
                ctx.addIssue({
                    code: "custom",
                    message: "Apply URL is required for external applications",
                    path: ["applyUrl"],
                });
            }
            else if (data.workMode !== WorkModeEnum.REMOTE && !data.locationId) {
                ctx.addIssue({
                    code: "custom",
                    message: "Location is required for onsite/hybrid jobs",
                    path: ["locationId"],
                });
            }
            else {
                try {
                    new URL(data.applyUrl);
                } catch {
                    ctx.addIssue({
                        code: "custom",
                        message: "Apply URL must be valid",
                        path: ["applyUrl"],
                    });
                }
            }
        }
        if (data.applyType === ApplyTypeEnum.PRE_SCREENING) {
            if (!data.screeningQuestions || data.screeningQuestions.length === 0) {
                ctx.addIssue({
                    code: "custom",
                    message: "Add at least one screening question for pre-screening applications",
                    path: ["screeningQuestions"],
                });
            }
        }
    });

export type JobFormData = z.infer<typeof jobSchema> & {
    role?: { id: string; name: string };
};
// ---------------------- Form Component ----------------------
interface PostJobFormProps {
    defaultValues?: Partial<JobFormData> & { id?: string | number }; // include optional id for edit
    onSuccess?: () => void;
    isEdit?: boolean;
}

export default function PostJobForm({ defaultValues, onSuccess, isEdit = false }: PostJobFormProps) {
    const messageModal = useMessageModal();
    const { createJobMutation, updateJobMutation } = useEmployerJobs();
    const { questions } = useScreeningQuestions();
    const { roles, skills, certifications, locations } = useMasterData();

    const methods = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        mode: "onChange",
        defaultValues: {
            title: "",
            roleId: "",
            workMode: WorkModeEnum.REMOTE,
            locationId: "",
            employmentType: EmploymentTypeEnum.FULL_TIME,
            contractDurationInMonths: undefined,
            experience: ExperienceLevelEnum.ENTRY,
            status: JobStatusEnum.DRAFT, // Added default status
            description: "",
            applyType: ApplyTypeEnum.DIRECT,
            applyUrl: "",
            certifications: [],
            skills: [],
            screeningQuestions: [],
            ...defaultValues, // merge edit values if provided
        },
    });

    const { handleSubmit, watch, formState, setValue, reset, trigger } = methods;

    const workMode = watch("workMode");
    const employmentType = watch("employmentType");
    const applyType = watch("applyType");

    // Pre-fill screening questions if fetched
    useEffect(() => {
        if (questions && questions.length > 0) {
            reset({
                ...watch(),
                screeningQuestions: questions.map((q: ScreeningQuestionInput) => ({
                    ...q,
                    options: q.options || [],
                })),
            });
        }
    }, [questions, reset]);

    useEffect(() => {
        trigger("applyUrl");
        trigger("screeningQuestions");
    }, [applyType, trigger]);


    useEffect(() => {
        if (defaultValues) {
            const updatedDefaults = { ...defaultValues };

            // Convert null contractDurationInMonths to undefined
            if (updatedDefaults.contractDurationInMonths === null) {
                updatedDefaults.contractDurationInMonths = undefined;
            }

            // Ensure roleId is set for edit mode
            if (!updatedDefaults.roleId && updatedDefaults.role) {
                updatedDefaults.roleId = updatedDefaults.role.id;
            }

            // Ensure locationId is set for ONSITE/HYBRID jobs
            if (!updatedDefaults.locationId && updatedDefaults.locationId) {
                updatedDefaults.locationId = updatedDefaults.locationId;
            }

            reset(updatedDefaults, { keepDirty: false, keepTouched: false });
            console.log("Form reset with updated defaults:", updatedDefaults);
        }
    }, [defaultValues, reset]);


    const onSubmit = (data: JobFormData) => {
        const selectedLocation = locations.find(
            (loc: any) => String(loc.id) === data.locationId
        );
        const { id, ...locationWithoutId } = selectedLocation || {};


        const { locationId, ...rest } = data;

        const formattedData: CreateJobInput = {
            ...rest, // all fields except locationId
            roleId: Number(data.roleId),
            location: locationWithoutId,
            certifications: data.certifications?.map(Number) || [],
            skills: data.skills?.map(Number) || [],
            screeningQuestions: data.screeningQuestions?.map(q => ({ ...q, options: q.options || [] })) || [],
            applyUrl: data.applyType === ApplyTypeEnum.EXTERNAL ? data.applyUrl : undefined,
        };

        console.log(formattedData);

        if (isEdit && defaultValues?.id) {
            updateJobMutation.mutate(
                { jobId: defaultValues.id, data: formattedData },
                {
                    onSuccess: () => messageModal.showMessage("success", "Job updated successfully!", () => {
                        window.location.reload();
                    }),
                    onError: () => messageModal.showMessage("error", "Failed to update job."),
                }
            );
        } else {
            createJobMutation.mutate(formattedData, {
                onSuccess: () => {
                    messageModal.showMessage("success", "Job created successfully!", () => {
                        window.location.href = `/employer/jobs/`;
                    });
                    reset();
                },
                onError: () => messageModal.showMessage("error", "Failed to create job."),

            });

        }
    };


    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
                <JobTitleRoleRow register={methods.register} errors={methods.formState.errors} setValue={setValue} watch={watch} />
                <JobTypeDurationRow register={methods.register} errors={methods.formState.errors} employmentType={employmentType} />
                <WorkModeLocationRow register={methods.register} errors={methods.formState.errors} workMode={workMode} setValue={setValue} watch={watch} />
                <ExperienceDescriptionRow register={methods.register} errors={methods.formState.errors} />
                <CertificationsSkillsRow register={methods.register} errors={methods.formState.errors} setValue={setValue} watch={watch} />
                <ApplyTypeSection register={methods.register} errors={methods.formState.errors} applyType={applyType} control={methods.control} setValue={setValue} watch={watch} />

                <button
                    type="submit"
                    disabled={!formState.isValid || formState.isSubmitting}
                    className={`w-full py-3 rounded-xl font-semibold mt-4 transition-all text-white ${formState.isValid ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"}`}
                >
                    {isEdit ? "Update Job" : "Create Job"}
                </button>
            </form>
        </FormProvider>
    );
}