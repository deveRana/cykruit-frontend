"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMessageModal } from "@/components/micro-interactions/modal/MessageModal";
import { useEmployer } from "@/features/employer/hooks/useEmployer";

const setupSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    companyWebsite: z.string().url("Invalid URL"),
    companySize: z.enum(["SMALL", "MEDIUM", "LARGE"]),
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
        } catch (errors: any) {
            messageModal.showMessage("error", errors?.[0]?.message || "Setup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <InputField label="Company Name" type="text" placeholder="Enter company name" register={register("companyName")} error={errors.companyName} />
            <InputField label="Company Website" type="url" placeholder="https://example.com" register={register("companyWebsite")} error={errors.companyWebsite} />
            <InputField label="Company Size" type="text" placeholder="SMALL / MEDIUM / LARGE" register={register("companySize")} error={errors.companySize} />
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
