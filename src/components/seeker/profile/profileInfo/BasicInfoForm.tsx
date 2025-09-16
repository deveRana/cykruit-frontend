"use client";
import React from "react";
import { FiMapPin, FiUser } from "react-icons/fi";
import { JobSeeker } from "@/features/seeker/types/seeker";

interface Props {
    form: Partial<JobSeeker>;
    setForm: React.Dispatch<React.SetStateAction<Partial<JobSeeker>>>;
    onSave: () => void;
}

const BasicInfoForm: React.FC<Props> = ({ form, setForm, onSave }) => {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Location */}
            <div className="flex flex-col">
                <label className="flex items-center gap-2 mb-1 text-gray-600 font-medium">
                    <FiMapPin className="text-[#0F123F]" /> Location
                </label>
                <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F123F]"
                />
            </div>

            {/* Bio */}
            <div className="flex flex-col">
                <label className="flex items-center gap-2 mb-1 text-gray-600 font-medium">
                    <FiUser className="text-[#0F123F]" /> Bio
                </label>
                <textarea
                    value={form.bio}
                    onChange={(e) => setForm({ ...form, bio: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0F123F] resize-none"
                    rows={4}
                />
            </div>

            <div className="col-span-2">
                <button
                    onClick={onSave}
                    className="w-full py-3 bg-[#0F123F] text-white font-semibold rounded-xl hover:bg-[#1a1a3f] transition"
                >
                    Save Basic Info
                </button>
            </div>
        </div>
    );
};

export default BasicInfoForm;
