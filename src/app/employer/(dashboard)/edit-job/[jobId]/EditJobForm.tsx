"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, JobFormData } from "../../post-job/PostJobForm";
import { useEmployerJobs } from "@/features/employer/hooks/useEmployerJobs";
import { useMessageModal } from "@/components/common/MessageModal";

// Components
import JobTitleRoleRow from "@components/forms/post-job/JobTitleRoleRow";
import JobTypeDurationRow from "@components/forms/post-job/JobTypeDurationRow";
import WorkModeLocationRow from "@components/forms/post-job/WorkModeLocationRow";
import ExperienceDescriptionRow from "@components/forms/post-job/ExperienceDescriptionRow";
import CertificationsSkillsRow from "@components/forms/post-job/CertificationsSkillsRow";
import ApplyTypeSection from "@components/forms/post-job/ApplyTypeSection";

interface EditJobFormProps {
    job: JobFormData & { id: string | number };
    onSuccess?: () => void;
}

export default function EditJobForm({ job, onSuccess }: EditJobFormProps) {
    const { updateJobMutation } = useEmployerJobs();
    const messageModal = useMessageModal();

    // ⚡ Initialize form with job data if available
    const methods = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        defaultValues: job
            ? {
                ...job,
                roleId: String(job.roleId || ""),
                locationId: String(job.locationId || ""),
                certifications: job.certifications?.map(String) || [],
                skills: job.skills?.map(String) || [],
                screeningQuestions:
                    job.screeningQuestions?.map((q) => ({ ...q, options: q.options || [] })) || [],
                applyUrl: job.applyType === "EXTERNAL" ? job.applyUrl || "" : "",
            }
            : {},
        mode: "onChange",
    });

    const { handleSubmit, watch, formState, setValue, reset } = methods;

    const workMode = watch("workMode");
    const employmentType = watch("employmentType");
    const applyType = watch("applyType");

    // ⚡ Fallback: reset form if job changes dynamically
    useEffect(() => {
        if (job) {
            console.log("🔄 Resetting form with job data:", job); // ✅ Log on reset
            reset({
                ...job,
                roleId: String(job.roleId || ""),
                locationId: String(job.locationId || ""),
                certifications: job.certifications?.map(String) || [],
                skills: job.skills?.map(String) || [],
                screeningQuestions:
                    job.screeningQuestions?.map((q) => ({ ...q, options: q.options || [] })) || [],
                applyUrl: job.applyType === "EXTERNAL" ? job.applyUrl || "" : "",
            });
        }
    }, [job, reset]);

    const onSubmit = (data: JobFormData) => {
        const formattedData = {
            ...data,
            roleId: Number(data.roleId),
            locationId: Number(data.locationId),
            certifications: data.certifications?.map(Number) || [],
            skills: data.skills?.map(Number) || [],
        };

        console.log("🚀 Submitting job update:", formattedData); // ✅ Log before sending to backend

        updateJobMutation.mutate(
            { jobId: job.id, data: formattedData },
            {
                onSuccess: (response) => {
                    console.log("✅ Job update response from backend:", response); // ✅ Log backend response
                    messageModal.showMessage("success", "Job updated successfully!", onSuccess);
                },
                onError: (error) => {
                    console.error("❌ Failed to update job:", error); // ✅ Log errors
                    messageModal.showMessage("error", "Failed to update job.");
                },
            }
        );
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <JobTitleRoleRow
                    register={methods.register}
                    errors={methods.formState.errors}
                    setValue={setValue}
                    watch={watch}
                />
                <JobTypeDurationRow
                    register={methods.register}
                    errors={methods.formState.errors}
                    employmentType={employmentType}
                />
                <WorkModeLocationRow
                    register={methods.register}
                    errors={methods.formState.errors}
                    workMode={workMode}
                    setValue={setValue}
                />
                <ExperienceDescriptionRow
                    register={methods.register}
                    errors={methods.formState.errors}
                />
                <CertificationsSkillsRow
                    register={methods.register}
                    errors={methods.formState.errors}
                    setValue={setValue}
                    watch={watch}
                />
                <ApplyTypeSection
                    register={methods.register}
                    errors={methods.formState.errors}
                    applyType={applyType}
                    control={methods.control}
                    setValue={setValue}
                    watch={watch}
                />

                <button
                    type="submit"
                    disabled={!formState.isDirty || !formState.isValid || formState.isSubmitting}
                    className={`w-full py-3 rounded-xl font-semibold mt-4 transition-all ${formState.isValid
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    Update Job
                </button>
            </form>
        </FormProvider>
    );
}
