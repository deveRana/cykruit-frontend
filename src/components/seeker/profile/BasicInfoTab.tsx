"use client";
import React, { useState, useEffect } from "react";
import { useSeekerProfile } from "@/features/seeker/hooks/useSeekerProfile";
import { useAppSelector } from "@/store/hooks";
import { JobSeeker } from "@/features/seeker/types/seeker";
import { FiEdit, FiMapPin, FiUser, FiImage } from "react-icons/fi";

const BasicInfoTab = () => {
    const { profile, loader, updateProfile } = useSeekerProfile();
    const authUser = useAppSelector((state) => state.auth.user);

    const [form, setForm] = useState<Partial<JobSeeker>>({
        bio: "",
        location: "",
        profileImage: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (profile) {
            setForm({
                bio: profile.bio || "",
                location: profile.location || "",
                profileImage: profile.profileImage || "",
            });
        }
    }, [profile]);

    if (loader) return loader; // ✅ centralized loader

    const handleSave = () => {
        updateProfile({
            bio: form.bio,
            location: form.location,
            profileImage: form.profileImage,
        });
        setIsEditing(false);
    };

    return (
        <div className="max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
            {/* Photo + Name + Email */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm">
                        {form.profileImage || authUser?.profilePicture ? (
                            <img
                                src={form.profileImage || authUser?.profilePicture!}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold text-lg">
                                Photo
                            </div>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-[#0F123F]">{authUser?.fullName}</h2>
                        <p className="text-gray-500">{authUser?.email}</p>
                    </div>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-[#0F123F] font-semibold hover:text-[#1a1a3f] transition"
                >
                    <FiEdit /> {isEditing ? "Cancel" : "Edit"}
                </button>
            </div>

            {/* Info display */}
            {!isEditing && (
                <div className="space-y-4">
                    {form.location && (
                        <div className="flex items-center gap-3 text-gray-700">
                            <FiMapPin className="text-[#0F123F] text-xl flex-shrink-0" />
                            <span>{form.location}</span>
                        </div>
                    )}
                    {form.bio && (
                        <div className="flex items-start gap-3 text-gray-700">
                            <FiUser className="text-[#0F123F] text-xl flex-shrink-0 mt-1" />
                            <span>{form.bio}</span>
                        </div>
                    )}
                </div>
            )}

            {/* Editable Form */}
            {isEditing && (
                <div className="space-y-4">
                    {/* Location */}
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2 mb-1 text-gray-600 font-medium">
                            <FiMapPin className="text-[#0F123F] text-lg flex-shrink-0" /> Location
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your location"
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition"
                        />
                    </div>

                    {/* Bio */}
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2 mb-1 text-gray-600 font-medium">
                            <FiUser className="text-[#0F123F] text-lg flex-shrink-0" /> Bio
                        </label>
                        <textarea
                            placeholder="Write a short bio"
                            value={form.bio}
                            onChange={(e) => setForm({ ...form, bio: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition resize-none"
                            rows={4}
                        />
                    </div>

                    {/* Profile Image */}
                    <div className="flex flex-col">
                        <label className="flex items-center gap-2 mb-1 text-gray-600 font-medium">
                            <FiImage className="text-[#0F123F] text-lg flex-shrink-0" /> Profile Image URL
                        </label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={form.profileImage}
                            onChange={(e) => setForm({ ...form, profileImage: e.target.value })}
                            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0F123F] transition"
                        />
                    </div>

                    <button
                        onClick={handleSave}
                        className="w-full py-3 bg-[#0F123F] text-white font-semibold rounded-xl hover:bg-[#1a1a3f] transition"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default BasicInfoTab;
