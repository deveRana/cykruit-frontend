"use client";

import React, { useEffect } from "react";
import InputField from "@/components/forms/InputField";
import AutocompleteField from "@/components/forms/AutocompleteField";
import { FieldErrors, UseFormRegister, UseFormSetValue, useFormContext } from "react-hook-form";
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

    // Log roles fetched from the hook
    console.log("📝 Roles loaded from hook:", roles);
    console.log("🔄 Roles loading state:", isRolesLoading);

    // Map roles to an array of strings for the autocomplete
    const roleSuggestions = roles?.map((r: any) => r.name) || [];
    console.log("💡 Role suggestions for autocomplete:", roleSuggestions);

    // Helper for logging role selection
    const handleSelect = (selected: string) => {
        console.log("🎯 Role selected:", selected);
        const role = roles?.find((r: any) => r.name === selected);
        console.log("🔹 Mapped role object:", role);
        if (role) {
            setValue("roleId", role.id, { shouldValidate: true });
            console.log("✅ roleId set in form:", role.id);
        }
    };

    // Optional: Log form errors and values on each render for debugging
    useEffect(() => {
        console.log("🔹 Current form errors:", errors);
    }, [errors]);

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
                onSelect={handleSelect} // ✅ use handleSelect to log and set number ID
            />
        </div>
    );
}
