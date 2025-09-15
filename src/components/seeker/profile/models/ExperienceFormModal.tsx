"use client";

import React from "react";
import { Experience } from "@/features/seeker/types/seeker";
import { cn } from "@/lib/utils/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { FiCalendar, FiBriefcase, FiType, FiBook } from "react-icons/fi";

interface ExperienceFormModalProps {
    form: Partial<Experience>;
    setForm: React.Dispatch<React.SetStateAction<Partial<Experience>>>;
    onClose: () => void;
    onSubmit: () => void;
}

const ExperienceFormModal: React.FC<ExperienceFormModalProps> = ({
    form,
    setForm,
    onClose,
    onSubmit,
}) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-lg relative flex flex-col gap-4">
                <h2 className="text-lg font-bold text-[#0F123F] mb-2">Add New Experience</h2>

                <input
                    type="text"
                    placeholder="Title"
                    value={form.title || ""}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className={cn(
                        "w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition"
                    )}
                />

                <input
                    type="text"
                    placeholder="Company"
                    value={form.company || ""}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className={cn(
                        "w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition"
                    )}
                />

                {/* Calendar Pickers */}
                <div className="flex gap-2">
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="w-1/2 flex items-center justify-center gap-2">
                                <FiCalendar /> {form.startDate || "Start Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white rounded-lg shadow-lg">
                            <Calendar
                                mode="single"
                                selected={form.startDate ? new Date(form.startDate) : undefined}
                                onSelect={(date) =>
                                    setForm({ ...form, startDate: date?.toISOString().split("T")[0] })
                                }
                                className="bg-white"
                            />
                        </PopoverContent>
                    </Popover>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="w-1/2 flex items-center justify-center gap-2">
                                <FiCalendar /> {form.endDate || "End Date"}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white rounded-lg shadow-lg">
                            <Calendar
                                mode="single"
                                selected={form.endDate ? new Date(form.endDate) : undefined}
                                onSelect={(date) =>
                                    setForm({ ...form, endDate: date?.toISOString().split("T")[0] })
                                }
                                className="bg-white"
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <textarea
                    placeholder="Description"
                    value={form.description || ""}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className={cn(
                        "w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition resize-none"
                    )}
                    rows={3}
                />

                <div className="flex justify-end gap-2">
                    <Button variant="secondary" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={onSubmit}>Add</Button>
                </div>
            </div>
        </div>
    );
};

export default ExperienceFormModal;
