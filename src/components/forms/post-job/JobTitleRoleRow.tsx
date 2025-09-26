"use client";

import React, { useEffect, useState } from "react";
import InputField from "@/components/forms/InputField";
import AutocompleteField from "@/components/forms/AutocompleteField";
import {
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

export default function JobTitleRoleRow({
    register,
    errors,
    setValue,
    watch,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    setValue: UseFormSetValue<JobFormData>;
    watch: UseFormWatch<JobFormData>;
}) {
    const { roles = [], isRolesLoading } = useMasterData();
    const [inputValue, setInputValue] = useState("");

    // watch the current roleId (string id in form state)
    const selectedRoleId = watch("roleId");
    const title = watch("title");

    // compute display string from roleId
    useEffect(() => {
        if (selectedRoleId && roles.length) {
            const selectedRole = roles.find(
                (r: any) => String(r.id) === String(selectedRoleId)
            );
            setInputValue(selectedRole ? selectedRole.name : "");
        }
    }, [selectedRoleId, roles]);

    // suggestions
    const roleSuggestions = roles.map((r: any) => r.name);

    // handle selecting a role from suggestions
    const handleSelect = (selected: string) => {
        setInputValue(selected);
        const role = roles.find((r: any) => r.name === selected);
        if (role) {
            setValue("roleId", String(role.id), { shouldValidate: true });
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <InputField
                label="Job Title"
                type="text"
                placeholder="Enter job title"
                register={register("title")}
                error={errors.title}
            />

            <AutocompleteField
                label="Role"
                placeholder={isRolesLoading ? "Loading roles..." : "Select role"}
                register={register("roleId")}
                error={errors.roleId}
                suggestions={roleSuggestions}
                onSelect={handleSelect}
                value={inputValue} // ✅ show role name
            />
        </div>
    );
}
