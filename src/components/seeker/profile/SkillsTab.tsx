"use client";
import React, { useState, useMemo } from "react";
import { useSeekerSkills } from "@/features/seeker/profile/hooks/useSeekerSkills";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import Loader from "@/components/common/Loader";

const SkillsTab = () => {
    const { skills, allSkills, addSkill, removeSkill, isLoading, loader } = useSeekerSkills();
    const [inputSkill, setInputSkill] = useState("");

    // Suggestions: filter out already added skills
    const suggestions = useMemo(() => {
        return allSkills
            .filter(
                (s) =>
                    s.name.toLowerCase().includes(inputSkill.toLowerCase()) &&
                    !skills.some((sk) => sk.skillId === s.id)
            )
            .slice(0, 10);
    }, [inputSkill, allSkills, skills]);

    const handleAddSkill = (skillId: number) => {
        addSkill(Number(skillId));
        setInputSkill("");
    };

    const handleDeleteSkill = (userSkillId: number) => {
        removeSkill(Number(userSkillId));
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <Loader />}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Current skills */}
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <div
                        key={skill.skillId}
                        className="flex items-center gap-2 bg-gray-50 border border-[#0F123F] text-[#0F123F] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition"
                    >
                        <span>{skill.name}</span>
                        <FiTrash2
                            className="cursor-pointer text-red-500 hover:text-red-600"
                            onClick={() => handleDeleteSkill(skill.skillId)}
                        />
                    </div>
                ))}
            </div>

            {/* Input */}
            <input
                type="text"
                placeholder="Filter skills..."
                value={inputSkill}
                onChange={(e) => setInputSkill(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#0F123F]"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {suggestions.map((s) => (
                        <button
                            key={s.id}
                            onClick={() => handleAddSkill(s.id)}
                            className="flex items-center gap-1 bg-[#0F123F] text-white px-3 py-1 rounded-full hover:bg-[#1a1a3f] transition"
                        >
                            {s.name} <FiPlus />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SkillsTab;
