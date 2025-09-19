"use client";

import React from "react";
import InputField from "@/components/forms/InputField";
import AutocompleteField from "@/components/forms/AutocompleteField";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import { usePostJob } from "@/features/employer/hooks/usePostJob";

export default function JobTitleRoleRow({
    register,
    errors,
    setValue,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    setValue: UseFormSetValue<JobFormData>;
}) {
    const { roles, isRolesLoading } = usePostJob();

    // Map roles to an array of strings for the autocomplete
    const roleSuggestions = roles?.map((r: any) => r.name) || [];

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Job Title */}
            <InputField
                label="Job Title"
                type="text"
                placeholder="Enter job title"
                register={register("title")}
                error={errors.title}
            />

            {/* Role with autocomplete */}
            <AutocompleteField
                label="Role"
                placeholder={isRolesLoading ? "Loading roles..." : "Select role"}
                register={register("roleId")}
                error={errors.roleId}
                suggestions={roleSuggestions}
                onSelect={(value) => setValue("roleId", value, { shouldValidate: true })}
            />
        </div>
    );
}
