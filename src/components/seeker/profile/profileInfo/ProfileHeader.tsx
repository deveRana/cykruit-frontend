"use client";
import React from "react";
import { FiEdit, FiPlus } from "react-icons/fi";
import Image from "next/image";

interface AuthUser {
    fullName: string;
    email: string;
    profilePicture?: string;
}

interface Props {
    authUser: AuthUser;
    isEditing: boolean;
    setIsEditing: (val: boolean) => void;
    onProfilePicChange: (file: File | null) => void;
}

const ProfileHeader: React.FC<Props> = ({ authUser, isEditing, setIsEditing, onProfilePicChange }) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-gray-100 shadow-sm group">
                    {authUser?.profilePicture ? (
                        <Image
                            src={authUser.profilePicture}
                            alt="Profile"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold text-lg">
                            Photo
                        </div>
                    )}

                    {/* Upload overlay */}
                    <label className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition">
                        <FiPlus className="text-white text-2xl" />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onProfilePicChange(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                    </label>
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
    );
};

export default ProfileHeader;
