"use client";

import React, { useState } from "react";
import {
    BasicInfoTab,
    EducationTab,
    ExperienceTab,
    SkillsTab,
    ResumeTab,
    ProfileTabs,
    CertificationsTab,
} from "@/components/seeker/profile";
import ResumeParseAndUpload from "@/components/seeker/profile/ResumeParseAndUpload";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState("basic");

    return (
        <div className="flex h-screen bg-[#F1F5F9]">
            <div className="flex-1 flex flex-col">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-[#0F123F] mb-4">My Profile</h1>

                    {/* Profile Tabs */}
                    <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                    {/* Tab Content */}
                    <div>
                        {activeTab === "basic" && <><BasicInfoTab /> <div className="mt-6">
                            <ResumeParseAndUpload />
                        </div>
                        </>}
                        {activeTab === "education" && <EducationTab />}
                        {activeTab === "experience" && <ExperienceTab />}
                        {activeTab === "skills" && <SkillsTab />}
                        {activeTab === "certifications" && <CertificationsTab />}
                        {activeTab === "resume" && <ResumeTab />}
                        {activeTab === "settings" && (
                            <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl space-y-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">
                                        Change Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        className="w-full p-2 border rounded mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-medium">
                                        Notification Preferences
                                    </label>
                                    <select className="w-full p-2 border rounded mt-1">
                                        <option>Email</option>
                                        <option>SMS</option>
                                        <option>Push Notifications</option>
                                    </select>
                                </div>
                                <button className="px-4 py-2 bg-red-600 text-white rounded">
                                    Delete Account
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
