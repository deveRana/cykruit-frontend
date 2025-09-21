import React, { useEffect, useState } from "react";
import InputField from "@/components/forms/InputField";
import AutocompleteField from "@/components/forms/AutocompleteField";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
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
    const { roles, isRolesLoading } = useMasterData();
    const [inputValue, setInputValue] = useState("");

    // watch the current roleId from RHF
    const roleId = watch("roleId");
    const title = watch("title");

    // 🔥 Log the incoming form values from parent
    useEffect(() => {
        console.log("JobTitleRoleRow Form Values:");
        console.log("title:", title);
        console.log("roleId:", roleId);
        console.log("errors:", errors);
        console.log("Full form watch:", {
            title,
            roleId,
        });
    }, [title, roleId, errors]);

    // update inputValue whenever roleId changes
    useEffect(() => {
        if (roleId && roles?.length) {
            const selectedRole = roles.find((r: any) => r.id === Number(roleId));
            if (selectedRole) setInputValue(selectedRole.name);
        }
    }, [roleId, roles]);

    // 🔥 Log inputValue changes
    useEffect(() => {
        console.log("inputValue synced with roleId:", inputValue);
    }, [inputValue]);

    const roleSuggestions = roles?.map((r: any) => r.name) || [];

    const handleSelect = (selected: string) => {
        setInputValue(selected);
        const role = roles?.find((r: any) => r.name === selected);
        if (role) {
            setValue("roleId", role.id, { shouldValidate: true });
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
                value={inputValue} // pass the synced value
            />
        </div>
    );
}
