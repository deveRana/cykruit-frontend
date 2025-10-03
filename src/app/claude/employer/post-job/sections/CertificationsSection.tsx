"use client";

import React from "react";
import { Shield } from "lucide-react";
import MultiSelectField from "@/components/common/MultiSelectField";
import {
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";

const certificationsList = [
    "CISSP", "CISM", "CISA", "CompTIA Security+", "CompTIA Network+", "CompTIA CySA+",
    "CEH (Certified Ethical Hacker)", "GCIH", "GSEC", "GIAC GPEN", "OSCP", "CISCP",
    "AWS Security Specialty", "Azure Security Engineer", "Google Cloud Security",
    "CISMP", "ISO 27001 Lead Auditor", "CRISC", "CGRC", "CCSP", "PCIP", "SSCP"
];

export function CertificationsSection<TFormValues extends FieldValues>({
    watch,
    setValue,
}: {
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}) {
    const selectedCertifications = watch(
        "selectedCertifications" as Path<TFormValues>
    ) as string[] || [];

    const handleChange = (items: string[]) => {
        setValue(
            "selectedCertifications" as Path<TFormValues>,
            items as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <MultiSelectField
                label="Required Certifications"
                icon={<Shield className="w-5 h-5" />}
                selectedItems={selectedCertifications}
                onChange={handleChange}
                availableItems={certificationsList}
                placeholder="e.g., CISSP, CEH..."
                searchPlaceholder="Search Certifications"
                emptyMessage="No certifications found"
                selectedLabel="Selected Certifications"
                tagColorClass="bg-blue-50 text-blue-700 border-blue-200"
                id="certifications"
            />

         
        </div>
    );
}