"use client";

import React, { useEffect } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ExperienceLevelEnum } from "@/features/employer/types/post-a-job";
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
    // Log current errors in this component
    useEffect(() => {
        console.log("📝 Errors in ExperienceDescriptionRow:", errors);
    }, [errors]);

    return (
        <div className="grid gap-6">
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
