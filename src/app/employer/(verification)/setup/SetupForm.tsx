"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMessageModal } from "@/components/common/MessageModal";
import { useEmployer } from "@/features/employer/hooks/useEmployer";

const setupSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    companyWebsite: z.string().url("Invalid URL"),
    companySize: z.enum([
        "SIZE_1_10",
        "SIZE_11_50",
        "SIZE_51_200",
        "SIZE_201_500",
        "SIZE_500_PLUS",
    ]),
    contactName: z.string().min(2, "Contact name is required"),
    contactEmail: z.string().email("Invalid email"),
});

type SetupFormData = z.infer<typeof setupSchema>;

interface SetupFormProps {
    onSuccess?: (nextUrl: string) => void;
}

export default function SetupForm({ onSuccess }: SetupFormProps) {
    const messageModal = useMessageModal();
    const { setupMutation } = useEmployer();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<SetupFormData>({
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
        <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <InputField label="Company Name" type="text" placeholder="Enter company name" register={register("companyName")} error={errors.companyName} />
            <InputField label="Company Website" type="url" placeholder="https://example.com" register={register("companyWebsite")} error={errors.companyWebsite} />

            {/* Dropdown for Company Size */}
            <div>
                <label className="block mb-1 font-medium">Company Size</label>
                <select
                    {...register("companySize")}
                    className="w-full border rounded-lg px-3 py-2"
                    defaultValue=""
                >
                    <option value="" disabled>Select company size</option>
                    <option value="SIZE_1_10">1 - 10</option>
                    <option value="SIZE_11_50">11 - 50</option>
                    <option value="SIZE_51_200">51 - 200</option>
                    <option value="SIZE_201_500">201 - 500</option>
                    <option value="SIZE_500_PLUS">500+</option>
                </select>
                {errors.companySize && (
                    <p className="text-sm text-red-500">{errors.companySize.message}</p>
                )}
            </div>

            <InputField label="Contact Name" type="text" placeholder="Enter contact name" register={register("contactName")} error={errors.contactName} />
            <InputField label="Contact Email" type="email" placeholder="Enter contact email" register={register("contactEmail")} error={errors.contactEmail} />

            <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${isValid && !loading
                    ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {loading ? "Saving..." : "Save & Continue"}
            </button>
        </form>
    );
}
