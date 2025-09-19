"use client";

import React, { useEffect } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { EmploymentTypeEnum } from "@/features/employer/types/post-a-job";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";

export default function JobTypeDurationRow({
    register,
    errors,
    employmentType,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    employmentType: EmploymentTypeEnum | undefined;
}) {
    // Log current employmentType and errors
    console.log("🔹 Employment Type selected:", employmentType);
    useEffect(() => {
        console.log("📝 Errors in JobTypeDurationRow:", errors);
    }, [errors]);

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Employment Type */}
            <SelectField
                label="Employment Type"
                placeholder="Select employment type"
                register={register("employmentType")}
                error={errors.employmentType}
                options={Object.values(EmploymentTypeEnum).map((type) => ({
                    value: type,
                    label: type,
                }))}
            />

            {/* Contract Duration */}
            {employmentType === EmploymentTypeEnum.CONTRACT && (
                <InputField
                    label="Contract Duration (Months)"
                    type="number"
                    placeholder="e.g. 6"
                    register={register("contractDurationInMonths", {
                        valueAsNumber: true,
                    })}
                    error={errors.contractDurationInMonths}
                />
            )}
        </div>
    );
}
