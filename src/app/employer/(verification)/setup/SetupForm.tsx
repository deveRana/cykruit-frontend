"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMessageModal } from "@/components/common/MessageModal";
import { useEmployer } from "@/features/employer/hooks/useEmployer";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data
const companyTypes = [
    { value: "PRIVATE_LIMITED", label: "Private Limited" },
    { value: "PUBLIC_LLC", label: "Public LLC" },
    { value: "PARTNERSHIP", label: "Partnership" },
    { value: "SOLE_PROPRIETORSHIP", label: "Sole Proprietorship" },
];

const industries = [
    { value: "CYBERSECURITY", label: "Cybersecurity" },
    { value: "FINTECH", label: "Fintech" },
    { value: "HEALTHCARE", label: "Healthcare" },
    { value: "EDTECH", label: "EdTech" },
    { value: "E_COMMERCE", label: "E-Commerce" },
];

const setupSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    companyType: z.string().min(1, "Company type is required"),
    industry: z.string().min(1, "Industry is required"),
    contactEmail: z.string().email("Invalid email"),
    companyWebsite: z.string().url("Invalid URL"),
});

type SetupFormData = z.infer<typeof setupSchema>;

interface SetupFormProps {
    onSuccess?: (nextUrl: string) => void;
}

interface ComboboxProps {
    name: keyof SetupFormData;
    options: { value: string; label: string }[];
    placeholder: string;
    control: any;
}

const Combobox = ({ name, options, placeholder, control }: ComboboxProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <button
                            type="button"
                            className="w-full flex items-center justify-between px-4 py-3 text-sm text-[var(--foreground)] border border-gray-300 rounded-lg bg-white hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] transition"
                        >
                            {options.find(opt => opt.value === field.value)?.label || placeholder}
                            <ChevronsUpDownIcon className="ml-2 h-4 w-4 opacity-50" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-2 bg-white rounded-lg shadow-lg border border-gray-200" align="start">
                        <Command className="w-full">
                            <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} className="w-full px-2 py-2 border-b border-gray-200 focus:outline-none text-sm" />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {options.map(option => (
                                        <CommandItem
                                            key={option.value}
                                            value={option.value}
                                            onSelect={(currentValue) => {
                                                field.onChange(currentValue);
                                                setOpen(false);
                                            }}
                                            className="px-2 py-2 rounded-md hover:bg-gray-100 flex items-center text-sm"
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    field.value === option.value ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                            {option.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            )}
        />
    );
};

export default function SetupForm({ onSuccess }: SetupFormProps) {
    const messageModal = useMessageModal();
    const { setupMutation } = useEmployer();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, control, formState: { errors, isValid } } = useForm<SetupFormData>({
        resolver: zodResolver(setupSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: SetupFormData) => {
        try {
            setLoading(true);
            const res = await setupMutation.mutateAsync(data);
            messageModal.showMessage("success", res.message, () => {
                if (onSuccess && res.nextUrl) onSuccess(res.nextUrl);
            });
        } catch (errors: unknown) {
            if (Array.isArray(errors) && errors[0]?.message) {
                messageModal.showMessage("error", errors[0].message);
            } else if (errors instanceof Error) {
                messageModal.showMessage("error", errors.message);
            } else {
                messageModal.showMessage("error", "Setup failed. Try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl bg-white dark:bg-[var(--background)]  p-8 space-y-6">
            <form className="space-y-6 w-full" onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Company Name"
                    type="text"
                    placeholder="Enter company name"
                    register={register("companyName")}
                    error={errors.companyName}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1 text-sm font-medium">Company Type</label>
                        <Combobox name="companyType" options={companyTypes} placeholder="Select company type" control={control} />
                        {errors.companyType && <p className="text-xs text-red-500 mt-1">{errors.companyType.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-1 text-sm font-medium">Industry</label>
                        <Combobox name="industry" options={industries} placeholder="Select industry" control={control} />
                        {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message}</p>}
                    </div>
                </div>

                <InputField
                    label="Contact Email"
                    type="email"
                    placeholder="Enter contact email"
                    register={register("contactEmail")}
                    error={errors.contactEmail}
                />

                <InputField
                    label="Company Website"
                    type="url"
                    placeholder="https://example.com"
                    register={register("companyWebsite")}
                    error={errors.companyWebsite}
                />

                <button
                    type="submit"
                    disabled={!isValid || loading}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all shadow-md ${isValid && !loading
                        ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Saving..." : "Save & Continue"}
                </button>
            </form>
        </div>
    );
}
