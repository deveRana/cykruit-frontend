"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/InputField";
import { useMessageModal } from "@/components/micro-interactions/modal/MessageModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEmployer } from "@/features/employer/hooks/useEmployer";

const kycSchema = z.object({
    panCardUrl: z.string().url().optional(),
    incorporationCertUrl: z.string().url().optional(),
    gstCertUrl: z.string().url().optional(),
    otherDocs: z.array(z.string().url()).optional(),
});

type KycFormData = z.infer<typeof kycSchema>;

interface KycFormProps {
    onSuccess?: (nextUrl: string) => void;
}

export default function KycForm({ onSuccess }: KycFormProps) {
    const messageModal = useMessageModal();
    const { kycMutation } = useEmployer();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<KycFormData>({
        resolver: zodResolver(kycSchema),
        mode: "onChange",
        defaultValues: { otherDocs: [] },
    });

    const onSubmit = async (data: KycFormData) => {
        try {
            setLoading(true);
            const res = await kycMutation.mutateAsync(data);
            messageModal.showMessage("success", res.message, () => {
                if (onSuccess && res.nextUrl) onSuccess(res.nextUrl);
            });
        } catch (errors: any) {
            messageModal.showMessage("error", errors?.[0]?.message || "KYC submission failed.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className="space-y-6 w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <InputField
                label="PAN Card URL"
                type="url"
                placeholder="Enter PAN Card URL"
                register={register("panCardUrl")}
                error={errors.panCardUrl}
            />
            <InputField
                label="Incorporation Certificate URL"
                type="url"
                placeholder="Enter Incorporation Cert URL"
                register={register("incorporationCertUrl")}
                error={errors.incorporationCertUrl}
            />
            <InputField
                label="GST Certificate URL"
                type="url"
                placeholder="Enter GST Cert URL"
                register={register("gstCertUrl")}
                error={errors.gstCertUrl}
            />
            <InputField
                label="Other Documents (comma separated URLs)"
                type="text"
                placeholder="Enter other document URLs"
                register={register("otherDocs")}
                // Fix for array field error typing
                error={Array.isArray(errors.otherDocs) ? errors.otherDocs[0] : errors.otherDocs}
            />

            <button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-semibold transition-all shadow-md ${isValid && !loading
                        ? "bg-[var(--accent)] text-[var(--accent-foreground)] hover:bg-[var(--accent-hover)]"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {loading ? "Submitting..." : "Submit KYC"}
            </button>
        </form>
    );
}
