"use client";

import React from "react";
import AutocompleteField from "@/components/forms/AutocompleteField";
import SelectField from "../SelectField";
import { FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import { WorkModeEnum } from "@/features/employer/types/post-a-job";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

interface WorkModeLocationRowProps {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    setValue: UseFormSetValue<JobFormData>;
    watch: UseFormWatch<JobFormData>;
    workMode: WorkModeEnum | undefined;
}

export default function WorkModeLocationRow({
    register,
    errors,
    setValue,
    watch,
    workMode,
}: WorkModeLocationRowProps) {
    const { locations = [], isLocationsLoading } = useMasterData();

    // Suggestions for autocomplete
    const locationSuggestions = locations?.map(
        (loc: any) => `${loc.city}, ${loc.state}, ${loc.country}`
    ) || [];

    // Compute current input value from locationId
    const selectedLocation = locations?.find(
        (loc: any) => String(loc.id) === watch("locationId")
    );
    const selectedLocationString = selectedLocation
        ? `${selectedLocation.city}, ${selectedLocation.state}, ${selectedLocation.country}`
        : "";

    // Handle user selecting a suggestion
    const handleSelect = (selected: string) => {
        const location = locations?.find(
            (loc: any) => `${loc.city}, ${loc.state}, ${loc.country}` === selected
        );
        if (location) {
            setValue("locationId", String(location.id), { shouldValidate: true });
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
                    value={selectedLocationString} // ✅ show previous location
                />
            )}
        </div>
    );
}
