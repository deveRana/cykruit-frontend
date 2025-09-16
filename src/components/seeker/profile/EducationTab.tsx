"use client";

import React, { useState } from "react";
import { useSeekerEducation } from "@/features/seeker/hooks/useSeekerEducation";
import { Education } from "@/features/seeker/types/seeker";
import { FiPlus, FiTrash2, FiBook, FiCalendar, FiType } from "react-icons/fi";
import EducationFormModal from "./modals/EducationFormModal";

const EducationTab = () => {
    const { education, isLoading, loader, addEducation, deleteEducation } = useSeekerEducation();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState<Partial<Education>>({
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    const handleAdd = () => {
        if (!form.degree && !form.institution) return;
        addEducation(form);
        setForm({ degree: "", institution: "", startDate: "", endDate: "", description: "" });
        setShowForm(false);
    };

    const handleDelete = (eduId: number | string) => {
        deleteEducation(Number(eduId)); // ✅ updated for single ID
    };

    const formatDate = (date?: string | Date | any) => {
        if (!date) return "-";
        if (typeof date === "string") return date;
        if (date instanceof Date) return date.toISOString().split("T")[0];
        try {
            const d = new Date(date);
            if (!isNaN(d.getTime())) return d.toISOString().split("T")[0];
        } catch {
            return "-";
        }
        return "-";
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
            {education.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-300 rounded-2xl">
                    <p className="text-gray-500 mb-4 text-lg">No education added yet.</p>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-[#0F123F] text-white rounded-lg hover:bg-[#1a1a3f] transition"
                        onClick={() => setShowForm(true)}
                    >
                        <FiPlus /> Add Education
                    </button>
                </div>
            ) : (
                education.map((edu) => (
                    <div
                        key={edu.id}
                        className="border-l-4 border-[#0F123F] bg-gray-50 p-5 rounded-lg shadow-sm hover:shadow-md transition flex flex-col gap-2"
                    >
                        <p className="text-xl font-bold text-[#0F123F]">{edu.degree || "N/A"}</p>

                        {edu.institution && (
                            <p className="flex items-center gap-2 text-gray-700">
                                <FiType className="text-[#0F123F]" /> {edu.institution}
                            </p>
                        )}

                        {(edu.startDate || edu.endDate) && (
                            <p className="flex items-center gap-2 text-gray-700">
                                <FiCalendar className="text-[#0F123F]" /> {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                            </p>
                        )}

                        {edu.description && (
                            <p className="flex items-start gap-2 text-gray-500 mt-1">
                                <FiBook className="text-[#0F123F] mt-1" /> {edu.description}
                            </p>
                        )}

                        <div className="flex justify-end">
                            <FiTrash2
                                className="text-red-500 hover:text-red-600 cursor-pointer"
                                onClick={() => handleDelete(edu.id)}
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
                <EducationFormModal
                    form={form}
                    setForm={setForm}
                    onClose={() => setShowForm(false)}
                    onSubmit={handleAdd}
                />
            )}
        </div>
    );
};

export default EducationTab;
