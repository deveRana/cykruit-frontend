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
                            {/* <ResumeParseAndUpload /> */}
                        </div>
                        </>}
                        {activeTab === "education" && <EducationTab />}
                        {activeTab === "experience" && <ExperienceTab />}
                        {activeTab === "skills" && <SkillsTab />}
                        {activeTab === "certifications" && <CertificationsTab />}
                        {activeTab === "resume" && <ResumeTab />}
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
