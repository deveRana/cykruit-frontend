"use client";
import React from "react";

interface ProfileTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTab, setActiveTab }) => {
    const tabs = ["basic", "education", "experience", "skills", "resume", "certifications", "settings"];
    return (
        <div className="flex space-x-4 border-b border-gray-300 mb-6">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    className={`py-2 px-4 font-semibold ${activeTab === tab ? "border-b-2 border-[#0F123F] text-[#0F123F]" : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default ProfileTabs;
