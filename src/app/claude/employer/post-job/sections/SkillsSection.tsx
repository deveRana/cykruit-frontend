"use client";

import React from "react";
import { Star } from "lucide-react";
import MultiSelectField from "@/components/common/MultiSelectField";
import {
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";

const skills = [
    "Network Security", "Vulnerability Assessment", "Penetration Testing", "Incident Response",
    "SIEM", "Firewall Management", "IDS/IPS", "Malware Analysis", "Digital Forensics",
    "Risk Assessment", "Compliance", "Cloud Security", "Identity Management", "Cryptography",
    "Threat Intelligence", "Security Awareness", "Python", "PowerShell", "Kali Linux",
    "Wireshark", "Nessus", "Metasploit", "Burp Suite", "Splunk", "QRadar", "ArcSight",
    "AWS", "Azure", "GCP", "Docker", "Kubernetes", "Terraform", "Ansible"
];

export function SkillsSection<TFormValues extends FieldValues>({
    watch,
    setValue,
}: {
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}) {
    const selectedSkills = watch("selectedSkills" as Path<TFormValues>) as string[] || [];

    const handleChange = (items: string[]) => {
        setValue(
            "selectedSkills" as Path<TFormValues>,
            items as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <MultiSelectField
                label="Required Skills"
                icon={<Star className="w-5 h-5" />}
                selectedItems={selectedSkills}
                onChange={handleChange}
                availableItems={skills}
                placeholder="e.g., Python, SIEM, Network Security..."
                searchPlaceholder="Search Skills"
                emptyMessage="No skills found"
                selectedLabel="Selected Skills"
                tagColorClass="bg-green-50 text-green-700 border-green-200"
                id="skills"
            />

        </div>
    );
}