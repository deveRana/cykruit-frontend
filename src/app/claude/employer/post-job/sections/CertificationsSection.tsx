"use client";

import React from "react";
import { Shield, Loader2 } from "lucide-react";
import MultiSelectField from "@/components/common/MultiSelectField";
import {
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

export function CertificationsSection<TFormValues extends FieldValues>({
    watch,
    setValue,
}: {
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}) {
    const { certifications = [], isCertificationsLoading } = useMasterData();
    const selectedCertifications = watch(
        "selectedCertifications" as Path<TFormValues>
    ) as number[] || [];

    // Create a map of certification name to ID for quick lookup
    const certificationMap = React.useMemo(() => {
        const map = new Map<string, number>();
        certifications.forEach((cert: any) => {
            map.set(cert.name, parseInt(cert.id));
        });
        return map;
    }, [certifications]);

    // Reverse map for selected certifications (ID to name)
    const selectedCertificationNames = React.useMemo(() => {
        return selectedCertifications.map(id => {
            const cert = certifications.find((c: any) => parseInt(c.id) === id);
            return cert?.name || "";
        }).filter(Boolean);
    }, [selectedCertifications, certifications]);

    const handleChange = (selectedNames: string[]) => {
        // Convert names back to IDs
        const ids = selectedNames
            .map(name => certificationMap.get(name))
            .filter((id): id is number => id !== undefined);

        setValue(
            "selectedCertifications" as Path<TFormValues>,
            ids as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    // Extract certification names from API response
    const certificationNames = certifications.map((cert: any) => cert.name || cert);

    if (isCertificationsLoading) {
        return (
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-3" />
                    <span className="text-gray-600">Loading certifications...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <MultiSelectField
                label="Required Certifications"
                icon={<Shield className="w-5 h-5" />}
                selectedItems={selectedCertificationNames}
                onChange={handleChange}
                availableItems={certificationNames}
                placeholder="e.g., CISSP, CEH..."
                searchPlaceholder="Search Certifications"
                emptyMessage="No certifications found"
                selectedLabel="Selected Certifications"
                tagColorClass="bg-blue-50 text-blue-700 border-blue-200"
                id="certifications"
                maxItems={10}
            />
        </div>
    );
}