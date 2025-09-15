"use client";
import React, { useState } from "react";
import { useSeekerSkills } from "@/features/seeker/hooks/useSeekerSkills";

const SkillsTab = () => {
    const { skills, addSkill, removeSkill, isLoading } = useSeekerSkills();
    const [newSkill, setNewSkill] = useState("");

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
            <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="flex items-center space-x-1 bg-[#0F123F] text-white px-3 py-1 rounded-full"
                    >
                        <span>{skill.name}</span>
                        <button
                            onClick={() => removeSkill(skill.id)}
                            className="text-white font-bold"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="text"
                placeholder="Add a skill and press enter"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && newSkill.trim()) {
                        addSkill({ name: newSkill.trim() });
                        setNewSkill("");
                    }
                }}
                className="w-full p-2 border rounded"
            />
        </div>
    );
};

export default SkillsTab;
