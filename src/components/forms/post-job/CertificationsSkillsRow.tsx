"use client";

import React from "react";
import {
    FieldErrors,
    UseFormSetValue,
    UseFormWatch,
    UseFormRegister,
    FieldError,
} from "react-hook-form";
import { JobFormData } from "@/app/employer/(dashboard)/post-job/PostJobForm";
import MultiSelectAutocompleteField from "@/components/forms/MultiSelectAutocompleteField";
import Loader from "@/components/common/Loader";
import { usePostJob } from "@/features/employer/hooks/usePostJob";

export default function CertificationsSkillsRow({
    register,
    errors,
    setValue,
    watch,
}: {
    register: UseFormRegister<JobFormData>;
    errors: FieldErrors<JobFormData>;
    setValue: UseFormSetValue<JobFormData>;
    watch: UseFormWatch<JobFormData>;
}) {
    const {
        skills = [],
        certifications = [],
        isSkillsLoading,
        isCertificationsLoading,
    } = usePostJob();

    const selectedCerts = watch("certifications") || [];
    const selectedSkills = watch("skills") || [];

    if (isCertificationsLoading || isSkillsLoading) {
        return (
            <div className="flex justify-center py-6">
                <Loader />
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Certifications */}
            <MultiSelectAutocompleteField
                label="Certifications"
                placeholder="Search certifications"
                suggestions={certifications.map((c: any) => c.name)}
                value={selectedCerts}
                onChange={(vals) =>
                    setValue("certifications", vals, { shouldValidate: true })
                }
                error={errors.certifications as unknown as FieldError}
            />

            {/* Skills */}
            <MultiSelectAutocompleteField
                label="Skills"
                placeholder="Search skills"
                suggestions={skills.map((s: any) => s.name)}
                value={selectedSkills}
                onChange={(vals) =>
                    setValue("skills", vals, { shouldValidate: true })
                }
                error={errors.skills as unknown as FieldError}
            />
        </div>
    );
}
