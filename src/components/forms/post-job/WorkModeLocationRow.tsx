"use client";

import React, { useEffect } from "react";
import AutocompleteField from "@/components/forms/AutocompleteField";
import SelectField from "../SelectField";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import { WorkModeEnum } from "@/features/employer/types/post-a-job";
import { usePostJob } from "@/features/employer/hooks/usePostJob";

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
    const { locations, isLocationsLoading } = usePostJob();

    // Log current workMode and errors
    console.log("🔹 Current Work Mode:", workMode);
    useEffect(() => {
        console.log("📝 Errors in WorkModeLocationRow:", errors);
    }, [errors]);

    // Map locations to strings for display
    const locationSuggestions = locations?.map(
        (loc: any) => `${loc.city}, ${loc.state}, ${loc.country}`
    ) || [];

    // Map selected string back to location ID
    const handleSelect = (selected: string) => {
        console.log("➡️ Selected location string:", selected);
        const location = locations?.find(
            (loc: any) => `${loc.city}, ${loc.state}, ${loc.country}` === selected
        );
        if (location) {
            console.log("➡️ Mapped location ID:", location.id);
            setValue("locationId", location.id, { shouldValidate: true }); // number for backend
        }
    };

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

            {/* Location (only if onsite) */}
            {workMode !== WorkModeEnum.REMOTE && (
                <AutocompleteField
                    label="Location"
                    placeholder={isLocationsLoading ? "Loading locations..." : "Select location"}
                    register={register("locationId")}
                    error={errors.locationId}
                    suggestions={locationSuggestions}
                    onSelect={handleSelect} // stores number
                />
            )}
        </div>
    );
}
