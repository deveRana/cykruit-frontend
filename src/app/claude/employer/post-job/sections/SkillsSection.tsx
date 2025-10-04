"use client";

import React from "react";
import { Star, Loader2 } from "lucide-react";
import MultiSelectField from "@/components/common/MultiSelectField";
import {
    FieldValues,
    Path,
    PathValue,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form";
import { useMasterData } from "@/features/employer/hooks/useMasterData";

export function SkillsSection<TFormValues extends FieldValues>({
    watch,
    setValue,
}: {
    watch: UseFormWatch<TFormValues>;
    setValue: UseFormSetValue<TFormValues>;
}) {
    const { skills = [], isSkillsLoading } = useMasterData();
    const selectedSkills = watch("selectedSkills" as Path<TFormValues>) as number[] || [];

    // Create a map of skill name to ID for quick lookup
    const skillMap = React.useMemo(() => {
        const map = new Map<string, number>();
        skills.forEach((skill: any) => {
            map.set(skill.name, parseInt(skill.id));
        });
        return map;
    }, [skills]);

    // Reverse map for selected skills (ID to name)
    const selectedSkillNames = React.useMemo(() => {
        return selectedSkills.map(id => {
            const skill = skills.find((s: any) => parseInt(s.id) === id);
            return skill?.name || "";
        }).filter(Boolean);
    }, [selectedSkills, skills]);

    const handleChange = (selectedNames: string[]) => {
        // Convert names back to IDs
        const ids = selectedNames
            .map(name => skillMap.get(name))
            .filter((id): id is number => id !== undefined);

        setValue(
            "selectedSkills" as Path<TFormValues>,
            ids as PathValue<TFormValues, Path<TFormValues>>,
            { shouldValidate: true }
        );
    };

    // Extract skill names from API response
    const skillNames = skills.map((skill: any) => skill.name || skill);

    if (isSkillsLoading) {
        return (
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-6 h-6 text-blue-600 animate-spin mr-3" />
                    <span className="text-gray-600">Loading skills...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <MultiSelectField
                label="Required Skills"
                icon={<Star className="w-5 h-5" />}
                selectedItems={selectedSkillNames}
                onChange={handleChange}
                availableItems={skillNames}
                placeholder="e.g., Python, SIEM, Network Security..."
                searchPlaceholder="Search Skills"
                emptyMessage="No skills found"
                selectedLabel="Selected Skills"
                tagColorClass="bg-green-50 text-green-700 border-green-200"
                id="skills"
                maxItems={10}
            />
        </div>
    );
}