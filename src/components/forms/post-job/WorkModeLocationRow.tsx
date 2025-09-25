"use client";

import React from "react";
import AutocompleteField from "@/components/forms/AutocompleteField";
import SelectField from "../SelectField";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import { WorkModeEnum } from "@/features/employer/types/post-a-job";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

export default function WorkModeLocationRow({
    register,
    errors,
    setValue,
    workMode,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    setValue: UseFormSetValue<JobFormData>;
    workMode: WorkModeEnum | undefined;
}) {
    const { locations = [], isLocationsLoading } = useMasterData();

    const locationSuggestions = locations?.map(
        (loc: any) => `${loc.city}, ${loc.state}, ${loc.country}`
    ) || [];

    const handleSelect = (selected: string) => {
        const location = locations?.find(
            (loc: any) => `${loc.city}, ${loc.state}, ${loc.country}` === selected
        );
        if (location) {
            // ✅ Keep locationId, do NOT create new 'location' field
            setValue("locationId", location.id.toString(), { shouldValidate: true });
        }
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <SelectField
                label="Work Mode"
                placeholder="Select work mode"
                register={register("workMode")}
                error={errors.workMode}
                options={Object.values(WorkModeEnum).map(mode => ({
                    value: mode,
                    label: mode,
                }))}
            />

            {workMode !== WorkModeEnum.REMOTE && (
                <AutocompleteField
                    label="Location"
                    placeholder={isLocationsLoading ? "Loading locations..." : "Select location"}
                    register={register("locationId")}
                    error={errors.locationId}
                    suggestions={locationSuggestions}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
}
