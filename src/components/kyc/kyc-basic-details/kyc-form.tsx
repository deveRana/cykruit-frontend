'use client';

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Globe, Mail, Briefcase, MapPin, ChevronRight } from "lucide-react";
import AutocompleteInput from "@/components/common/auto-complete-input";
import { OptionPicker } from "@/components/common/option-picker";
import { useMessageModal } from "@/components/common/MessageModal";
import { useEmployer } from "@/features/employer/hooks/useVeificationHook";

// ---------------------- Schema ----------------------
const kycSchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    website: z.string().url("Please enter a valid website URL"),
    contactEmail: z.string().email("Please enter a valid email address"),
    companyType: z.string().min(1, "Please select a company type"),
    location: z.string().min(2, "Location is required"),
});

type KYCFormData = z.infer<typeof kycSchema>;

// ---------------------- Props ----------------------
interface KYCFormProps {
    onSuccess?: (nextUrl: string) => void;
}

const locations = ["New York, USA", "San Francisco, USA", "London, UK", "Berlin, Germany", "Bangalore, India", "Pune, India"];

// ---------------------- Component ----------------------
const KYCForm = ({ onSuccess }: KYCFormProps) => {
    const messageModal = useMessageModal();
    const { setupEmployer, isLoading } = useEmployer();

    const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } = useForm<KYCFormData>({
        resolver: zodResolver(kycSchema),
        mode: "onChange",
    });

    const onSubmit = async (data: KYCFormData) => {
        try {
            const res = await setupEmployer({
                companyName: data.companyName,
                companyType: data.companyType,
                companyWebsite: data.website,
                contactEmail: data.contactEmail,
                location: data.location,
                industry: "", // optional field, adjust if needed
            });
            messageModal.showMessage("success", res?.message || "Setup successful!", () => {
                if (onSuccess && res?.nextUrl) onSuccess(res.nextUrl);
            });
        } catch (err: unknown) {
            if (err instanceof Error) {
                messageModal.showMessage("error", err.message);
            } else {
                messageModal.showMessage("error", "Setup failed. Try again.");
            }
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Information</h1>
                <p className="text-gray-600">Please provide your company details for verification</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Company Name */}
                <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                        Company Name *
                    </label>
                    <input
                        type="text"
                        {...register("companyName")}
                        placeholder="Enter your company name"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${errors.companyName ? "border-red-300" : "border-gray-300"}`}
                    />
                    {errors.companyName && <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>}
                </div>

                {/* Website */}
                <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Globe className="w-4 h-4 mr-2 text-blue-600" />
                        Website *
                    </label>
                    <input
                        type="url"
                        {...register("website")}
                        placeholder="https://www.yourcompany.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${errors.website ? "border-red-300" : "border-gray-300"}`}
                    />
                    {errors.website && <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>}
                </div>

                {/* Contact Email */}
                <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 mr-2 text-blue-600" />
                        Contact Email *
                    </label>
                    <input
                        type="email"
                        {...register("contactEmail")}
                        placeholder="contact@yourcompany.com"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-all ${errors.contactEmail ? "border-red-300" : "border-gray-300"}`}
                    />
                    {errors.contactEmail && <p className="mt-1 text-sm text-red-600">{errors.contactEmail.message}</p>}
                </div>

                {/* Company Type */}
                <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <Briefcase className="w-4 h-4 mr-2 text-blue-600" />
                        Company Type *
                    </label>
                    <OptionPicker
                        name="companyType"
                        control={control}
                        placeholder="Select company type"
                        options={[
                            { value: "STARTUP", label: "Startup" },
                            { value: "SME", label: "SME (Small & Medium Enterprise)" },
                            { value: "ENTERPRISE", label: "Enterprise" },
                        ]}
                    />
                    {errors.companyType && <p className="mt-1 text-sm text-red-600">{errors.companyType.message}</p>}
                </div>

                {/* Location */}
                <div>
                    <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                        Location *
                    </label>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <AutocompleteInput
                                value={field.value || ""}
                                onChange={field.onChange}
                                onSelect={field.onChange}
                                suggestions={locations}
                                placeholder="Enter location"
                                required
                            />
                        )}
                    />
                    {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>}
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting || isLoading}
                        className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors shadow-md ${isValid && !isSubmitting && !isLoading ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                        {isSubmitting || isLoading ? "Saving..." : "Next: Upload Documents"}
                        <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KYCForm;