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
import Loader from "@/components/common/loader";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

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
    const { skills = [], certifications = [], isSkillsLoading, isCertificationsLoading } = useMasterData();

    const selectedCertsIds = watch("certifications") || [];
    const selectedSkillsIds = watch("skills") || [];

    if (isCertificationsLoading || isSkillsLoading) {
        return (
            <div className="flex justify-center py-6">
                <Loader />
            </div>
        );
    }

    const certSuggestions = certifications.map((c: any) => c.name);
    const skillSuggestions = skills.map((s: any) => s.name);

    const handleCertChange = (selectedNames: string[]) => {
        const ids = certifications
            .filter((c: any) => selectedNames.includes(c.name))
            .map((c: any) => c.id);
        setValue("certifications", ids, { shouldValidate: true });
    };

    const handleSkillChange = (selectedNames: string[]) => {
        const ids = skills
            .filter((s: any) => selectedNames.includes(s.name))
            .map((s: any) => s.id);
        setValue("skills", ids, { shouldValidate: true });
    };

    return (
        <div className="grid md:grid-cols-2 gap-6">
            <MultiSelectAutocompleteField
                label="Certifications"
                placeholder="Search certifications"
                suggestions={certSuggestions}
                value={selectedCertsIds.map(
                    (id) => certifications.find((c: any) => c.id === id)?.name || ""
                )}
                onChange={handleCertChange}
                error={errors.certifications as unknown as FieldError}
            />

            <MultiSelectAutocompleteField
                label="Skills"
                placeholder="Search skills"
                suggestions={skillSuggestions}
                value={selectedSkillsIds.map(
                    (id) => skills.find((s: any) => s.id === id)?.name || ""
                )}
                onChange={handleSkillChange}
                error={errors.skills as unknown as FieldError}
            />
        </div>
    );
}
