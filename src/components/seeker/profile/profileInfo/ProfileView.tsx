"use client";
import React from "react";
import { FiMapPin, FiUser, FiLink } from "react-icons/fi";
import { JobSeeker } from "@/features/seeker/types/seeker";

const ProfileView: React.FC<{ profile: JobSeeker }> = ({ profile }) => {
    return (
        <div className="grid grid-cols-2 gap-6">
            {/* Left column */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                    <FiMapPin className="text-[#0F123F] text-xl flex-shrink-0" />
                    <span>{profile.location || <span className="text-gray-400 italic">No location added</span>}</span>
                </div>

                <div className="flex items-start gap-3 text-gray-700">
                    <FiUser className="text-[#0F123F] text-xl flex-shrink-0 mt-1" />
                    <span>{profile.bio || <span className="text-gray-400 italic">No bio added</span>}</span>
                </div>
            </div>

            {/* Right column */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-700">
                    <FiLink className="text-[#0F123F]" />
                    {profile.github ? (
                        <a
                            href={profile.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            GitHub
                        </a>
                    ) : (
                        <span className="text-gray-400 italic">No GitHub added</span>
                    )}
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                    <FiLink className="text-[#0F123F]" />
                    {profile.linkedin ? (
                        <a
                            href={profile.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            LinkedIn
                        </a>
                    ) : (
                        <span className="text-gray-400 italic">No LinkedIn added</span>
                    )}
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                    <FiLink className="text-[#0F123F]" />
                    {profile.personalWebsite ? (
                        <a
                            href={profile.personalWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                        >
                            Website
                        </a>
                    ) : (
                        <span className="text-gray-400 italic">No website added</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileView;
