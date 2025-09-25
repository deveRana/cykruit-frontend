"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ExperienceLevelEnum, JobStatusEnum } from "@/features/employer/types/post-a-job";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import SelectField from "@/components/forms/SelectField";
import TextareaField from "@/components/forms/TextareaField";

export default function ExperienceDescriptionRow({
    register,
    errors,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
}) {
    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience */}
                <SelectField
                    label="Experience"
                    placeholder="Select experience level"
                    register={register("experience")}
                    error={errors.experience}
                    options={Object.values(ExperienceLevelEnum).map((exp) => ({
                        value: exp,
                        label: exp,
                    }))}
                />

                {/* Status */}
                <SelectField
                    label="Status"
                    placeholder="Select job status"
                    register={register("status")}
                    error={errors.status}
                    options={Object.values(JobStatusEnum).map((status) => ({
                        value: status,
                        label: status,
                    }))}
                />
            </div>

            {/* Description */}
            <TextareaField
                label="Description"
                placeholder="Enter job description"
                register={register("description")}
                error={errors.description}
                rows={10}
            />
        </div>
    );
}