"use client";

import React, { useEffect, useState } from "react";
import {
    FieldValues,
    FieldErrors,
    Path,
    PathValue,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { useMasterData } from "@/features/employer/hooks/useMasterData";
import { Briefcase, Search, Check, Loader2 } from "lucide-react";

export default function BasicInformationSection<
    TFormValues extends FieldValues
>({
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
    const { roles = [], isRolesLoading } = useMasterData();
    const [roleSuggestions, setRoleSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [isRoleSelected, setIsRoleSelected] = useState(false);

    const selectedRoleId = watch("roleId" as Path<TFormValues>) as string;

    // sync input value with selected roleId
    useEffect(() => {
        if (selectedRoleId && roles.length) {
            const selectedRole = roles.find(
                (r: any) => String(r.id) === String(selectedRoleId)
            );
            if (selectedRole) {
                setInputValue(selectedRole.name);
                setIsRoleSelected(true);
            }
        }
    }, [selectedRoleId, roles]);

    // filter suggestions dynamically
    useEffect(() => {
        if (inputValue && !isRoleSelected) {
            const filtered = roles
                .map((r: any) => r.name)
                .filter((name: string) =>
                    name.toLowerCase().includes(inputValue.toLowerCase())
                );
            setRoleSuggestions(filtered.slice(0, 5));
        } else {
            setRoleSuggestions([]);
        }
    }, [inputValue, roles, isRoleSelected]);

    const handleSelect = (selected: string) => {
        setInputValue(selected);
        const role = roles.find((r: any) => r.name === selected);
        if (role) {
            setValue(
                "roleId" as Path<TFormValues>,
                String(role.id) as PathValue<TFormValues, Path<TFormValues>>,
                { shouldValidate: true }
            );
            setIsRoleSelected(true);
        }
        setShowSuggestions(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsRoleSelected(false);
        setShowSuggestions(true);

        // Clear roleId if user is typing
        if (selectedRoleId) {
            setValue(
                "roleId" as Path<TFormValues>,
                "" as PathValue<TFormValues, Path<TFormValues>>,
                { shouldValidate: true }
            );
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6 flex items-center">
                <Briefcase className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Basic Information
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Enter the basic details about the position
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Job Title *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="e.g., Senior Software Engineer"
                            {...register("title" as Path<TFormValues>)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10"
                        />
                        <Briefcase className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.title.message)}
                        </p>
                    )}
                    <p className="text-gray-500 text-xs mt-1">
                        Use a clear, descriptive job title
                    </p>
                </div>

                {/* Role with enhanced suggestions */}
                <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Role *
                    </label>
                    <div className="relative">
                        <input
                            type="text"
                            autoComplete="off"
                            placeholder={
                                isRolesLoading
                                    ? "Loading roles..."
                                    : "Search for a role..."
                            }
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => !isRoleSelected && setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            disabled={isRolesLoading}
                            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-10 ${isRolesLoading ? "bg-gray-50 cursor-wait" : ""
                                } ${isRoleSelected ? "bg-green-50 border-green-300" : ""}`}
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isRolesLoading ? (
                                <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                            ) : isRoleSelected ? (
                                <Check className="w-5 h-5 text-green-600" />
                            ) : (
                                <Search className="w-5 h-5 text-gray-400" />
                            )}
                        </div>
                    </div>

                    {errors.roleId && (
                        <p className="text-red-500 text-sm mt-1">
                            {String(errors.roleId.message)}
                        </p>
                    )}

                    {!isRoleSelected && (
                        <p className="text-gray-500 text-xs mt-1">
                            Start typing to see suggestions
                        </p>
                    )}

                    {showSuggestions && roleSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-60 overflow-y-auto">
                            <div className="p-2 border-b border-gray-100 bg-gray-50">
                                <p className="text-xs text-gray-600 font-medium">
                                    Suggested Roles
                                </p>
                            </div>
                            {roleSuggestions.map((role, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className="w-full px-4 py-3 text-left hover:bg-blue-50 text-sm transition-colors flex items-center justify-between group"
                                    onClick={() => handleSelect(role)}
                                >
                                    <span className="text-gray-900 group-hover:text-blue-600 font-medium">
                                        {role}
                                    </span>
                                    <Search className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                                </button>
                            ))}
                        </div>
                    )}

                    {showSuggestions &&
                        !isRolesLoading &&
                        inputValue &&
                        roleSuggestions.length === 0 && (
                            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl p-4">
                                <div className="text-center">
                                    <Search className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                    <p className="text-sm text-gray-600">
                                        No roles found matching "{inputValue}"
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Try a different search term
                                    </p>
                                </div>
                            </div>
                        )}
                </div>
            </div>

            {/* Info box */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-900">
                    <span className="font-semibold">💡 Pro tip:</span> A clear job
                    title and role help candidates find your posting faster and attract
                    the right talent.
                </p>
            </div>
        </div>
    );
}