"use client";

import React, { useState } from "react";
import { useSeekerExperience } from "@/features/seeker/profile/hooks/useSeekerExperience";
import { Experience } from "@/features/seeker/profile/types/seeker";
import { FiPlus, FiTrash2, FiCalendar, FiBriefcase, FiBook } from "react-icons/fi";
import ExperienceFormModal from "../../common/modals/ExperienceFormModal";

const ExperienceTab = () => {
    const { experience, isLoading, loader, addExperience, deleteExperience } = useSeekerExperience();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<Partial<Experience>>({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    const handleAdd = () => {
        if (!form.title && !form.company) return;
        addExperience(form);
        setForm({
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
        });
        setShowForm(false);
    };

    const handleDelete = (expId: number | string) => {
        deleteExperience(Number(expId)); // ✅ updated for single ID
    };

    const formatDate = (date?: string | Date | number): string => {
        if (!date) return "-";
        if (typeof date === "string") return date;
        const d = new Date(date);
        return isNaN(d.getTime()) ? "-" : d.toISOString().split("T")[0];
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                {loader || <div>Loading...</div>}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {experience.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl">
                    <p className="text-gray-500 mb-4 text-lg">No experience added yet.</p>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-[#0F123F] text-white rounded-lg hover:bg-[#1a1a3f] transition"
                        onClick={() => setShowForm(true)}
                    >
                        <FiPlus /> Add Experience
                    </button>
                </div>
            ) : (
                experience.map((exp) => (
                    <div
                        key={exp.id}
                        className="border-l-4 border-[#0F123F] bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition flex flex-col gap-2"
                    >
                        <p className="text-xl font-bold text-[#0F123F]">{exp.title || "N/A"}</p>

                        {exp.company && (
                            <p className="flex items-center gap-2 text-gray-700">
                                <FiBriefcase className="text-[#0F123F]" /> {exp.company}
                            </p>
                        )}

                        {(exp.startDate || exp.endDate) && (
                            <p className="flex items-center gap-2 text-gray-700">
                                <FiCalendar className="text-[#0F123F]" /> {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                            </p>
                        )}

                        {exp.description && (
                            <p className="flex items-start gap-2 text-gray-500 mt-1">
                                <FiBook className="text-[#0F123F] mt-1" /> {exp.description}
                            </p>
                        )}

                        <div className="flex justify-end">
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                onClick={() => handleDelete(exp.id)}
                            />
                        </div>
                    </div>
                ))
            )}

            <button
                className="fixed bottom-6 right-6 flex items-center justify-center w-14 h-14 bg-[#0F123F] text-white rounded-full shadow-lg hover:bg-[#1a1a3f] transition text-2xl z-50"
                onClick={() => setShowForm(true)}
            >
                <FiPlus />
            </button>

            {showForm && (
                <ExperienceFormModal
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAdd}
                />
            )}
        </div>
    );
};

export default ExperienceTab;
