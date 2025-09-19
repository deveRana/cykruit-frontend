"use client";

import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { WorkModeEnum } from "@/features/employer/types/post-a-job";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";

export default function WorkModeLocationRow({
    register,
    errors,
    workMode,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    workMode: WorkModeEnum | undefined;
}) {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Work Mode */}
            <SelectField
                label="Work Mode"
                placeholder="Select work mode"
                register={register("workMode")}
                error={errors.workMode}
                options={Object.values(WorkModeEnum).map((mode) => ({
                    value: mode,
                    label: mode,
                }))}
            />

            {/* Location (only when onsite) */}
            {workMode !== WorkModeEnum.REMOTE && (
                <InputField
                    label="Location"
                    type="text"
                    placeholder="Location"
                    register={register("locationId")}
                    error={errors.locationId}
                />
            )}
        </div>
    );
}
