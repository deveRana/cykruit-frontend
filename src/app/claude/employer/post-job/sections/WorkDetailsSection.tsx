"use client";

import React from "react";
import { Building2, MapPin, Home, Briefcase, Globe } from "lucide-react";
import {
    FieldValues,
    FieldErrors,
    Path,
    PathValue,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import LocationAutocompleteField from "@/components/common/location-auto-complete-field";
import { LocationSuggestion } from "@/features/common/types/location";

export default function WorkDetailsSection<TFormValues extends FieldValues>({
    register,
    errors,
    setValue,
    watch,
}: {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
    watch: UseFormWatch<TFormValues>;
}) {
    const workModeOptions = [
        {
            value: "Remote",
            label: "Remote",
            description: "Work from anywhere",
            icon: Globe,
        },
        {
            value: "On-site",
            label: "On-site",
            description: "Work from office location",
            icon: Building2,
        },
        {
            value: "Hybrid",
            label: "Hybrid",
            description: "Mix of remote and office",
            icon: Home,
        },
    ];

    const workMode = watch("workMode" as Path<TFormValues>) as string;
    const location = watch("location" as Path<TFormValues>) as
        | LocationSuggestion
        | null;

    const showLocation = workMode === "On-site" || workMode === "Hybrid";

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
                <div className="flex items-center mb-2">
                    <Building2 className="w-5 h-5 text-blue-600 mr-2" />
                    <h2 className="text-xl font-bold text-gray-900">Work Details</h2>
                </div>
                <p className="text-gray-600 text-sm">
                    Specify work mode and location preferences
                </p>
            </div>

            {/* Work Mode Selection - Card Style */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Work Mode *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {workModeOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() =>
                                    setValue(
                                        "workMode" as Path<TFormValues>,
                                        option.value as PathValue<
                                            TFormValues,
                                            Path<TFormValues>
                                        >,
                                        { shouldValidate: true }
                                    )
                                }
                                className={`p-5 border-2 rounded-lg text-left transition-all hover:shadow-md ${workMode === option.value
                                        ? "border-blue-600 bg-blue-50"
                                        : "border-gray-200 hover:border-gray-300"
                                    }`}
                            >
                                <Icon
                                    className={`w-6 h-6 mb-3 ${workMode === option.value
                                            ? "text-blue-600"
                                            : "text-gray-400"
                                        }`}
                                />
                                <div
                                    className={`font-semibold mb-1 ${workMode === option.value
                                            ? "text-blue-900"
                                            : "text-gray-900"
                                        }`}
                                >
                                    {option.label}
                                </div>
                                <div className="text-xs text-gray-600">
                                    {option.description}
                                </div>
                            </button>
                        );
                    })}
                </div>
                {errors.workMode && (
                    <p className="text-red-500 text-sm mt-2">
                        {String(errors.workMode.message)}
                    </p>
                )}
            </div>

            {/* Location Field - Shows only for On-site or Hybrid */}
            {showLocation && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">

                    <LocationAutocompleteField
                        value={location?.fullAddress || ""}
                        onChange={(loc: LocationSuggestion | null) =>
                            setValue(
                                "location" as Path<TFormValues>,
                                loc as PathValue<TFormValues, Path<TFormValues>>,
                                { shouldValidate: true }
                            )
                        }
                        label="Location"
                        placeholder="Search for a city or address..."
                        required
                        id="job-location"
                    />
                    {errors.location && (
                        <p className="text-red-500 text-sm mt-2">
                            {String(errors.location.message)}
                        </p>
                    )}

                    {/* Location Preview */}
                    {location && (
                        <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                            <div className="flex items-start">
                                <MapPin className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        Selected Location:
                                    </p>
                                    <p className="text-sm text-gray-700 mt-1">
                                        {location.fullAddress}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Work Mode Info */}
                    <div className="mt-4 p-3 bg-white/80 rounded-lg border border-blue-100">
                        <p className="text-xs text-gray-600">
                            {workMode === "Hybrid" ? (
                                <>
                                    <span className="font-semibold">Hybrid Mode:</span>{" "}
                                    Candidates can work both remotely and from this office
                                    location
                                </>
                            ) : (
                                <>
                                    <span className="font-semibold">On-site Mode:</span>{" "}
                                    Candidates will work primarily from this office location
                                </>
                            )}
                        </p>
                    </div>
                </div>
            )}

            {/* Remote Work Info */}
            {workMode === "Remote" && (
                <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                    <div className="flex items-start">
                        <Globe className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">
                                Remote Position
                            </p>
                            <p className="text-sm text-gray-700">
                                This position allows candidates to work from anywhere. No
                                specific office location is required.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}