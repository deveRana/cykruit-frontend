"use client";
import React, { useState, useEffect } from "react";
import { useSeekerProfile } from "@/features/seeker/hooks/useSeekerProfile";
import { useAppSelector } from "@/store/hooks";
import { JobSeeker } from "@/features/seeker/types/seeker";
import ProfileHeader from "./profileInfo/ProfileHeader";
import ProfileView from "./profileInfo/ProfileView";
import BasicInfoForm from "./profileInfo/BasicInfoForm";
import LinksForm from "./profileInfo/LinksForm";

const BasicInfoTab = () => {
    const { profile, loader, updateProfile, updateProfilePic, updateLinks } = useSeekerProfile();
    const authUser = useAppSelector((state) => state.auth.user);

    const [activeTab, setActiveTab] = useState<"basic" | "links">("basic");
    const [isEditing, setIsEditing] = useState(false);

    const [form, setForm] = useState<Partial<JobSeeker>>({ bio: "", location: "" });
    const [links, setLinks] = useState<{ github?: string; linkedin?: string; personalWebsite?: string }>({
        github: "",
        linkedin: "",
        personalWebsite: "",
    });

    useEffect(() => {
        if (profile) {
            setForm({ bio: profile.bio || "", location: profile.location || "" });
            setLinks({
                github: profile.github || "",
                linkedin: profile.linkedin || "",
                personalWebsite: profile.personalWebsite || "",
            });
        }
    }, [profile]);

    if (loader) return loader;

    const handleSaveBasic = () => {
        updateProfile({ bio: form.bio, location: form.location });
        setIsEditing(false);
    };

    const handleSaveLinks = () => {
        updateLinks(links);
        setIsEditing(false);
    };

    const handleProfilePicChange = (file: File | null) => {
        if (file) updateProfilePic(file);
    };

    return (
        <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
            {authUser && (
                <ProfileHeader
                    authUser={authUser}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onProfilePicChange={handleProfilePicChange}
                />
            )}

            {isEditing && (
                <div className="flex gap-4 border-b border-gray-200 pb-2">
                    <button
                        onClick={() => setActiveTab("basic")}
                        className={`pb-1 ${activeTab === "basic" ? "border-b-2 border-[#0F123F] text-[#0F123F]" : "text-gray-500"}`}
                    >
                        Basic Info
                    </button>
                    <button
                        onClick={() => setActiveTab("links")}
                        className={`pb-1 ${activeTab === "links" ? "border-b-2 border-[#0F123F] text-[#0F123F]" : "text-gray-500"}`}
                    >
                        Links
                    </button>
                </div>
            )}

            {!isEditing && profile && <ProfileView profile={profile} />}

            {isEditing && activeTab === "basic" && (
                <BasicInfoForm form={form} setForm={setForm} onSave={handleSaveBasic} />
            )}

            {isEditing && activeTab === "links" && (
                <LinksForm links={links} setLinks={setLinks} onSave={handleSaveLinks} />
            )}
        </div>
    );
};

export default BasicInfoTab;
