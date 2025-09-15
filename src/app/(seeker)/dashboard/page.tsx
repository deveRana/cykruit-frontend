"use client";

import React from "react";
import WelcomeCard from "@/components/seeker/dashboard/WelcomeCard";
import StatsGrid from "@/components/seeker/dashboard/StatsGrid";
import ProfileCompletion from "@/components/seeker/dashboard/ProfileCompletion";
import RecentApplications from "@/components/seeker/dashboard/RecentApplications";
import RecommendedJobs from "@/components/seeker/dashboard/RecommendedJobs";
import SavedJobsPreview from "@/components/seeker/dashboard/SavedJobsPreview";

export default function DashboardPage() {
    return (
        <div className="space-y-10"> {/* Increased spacing for a more breathable layout */}
            {/* Welcome Card */}
            <WelcomeCard />

            {/* Top Row: Profile Completion + Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-1">
                    <ProfileCompletion progress={70} />
                </div>
                <div className="lg:col-span-4">
                    <StatsGrid
                        stats={[
                            { title: "Jobs Applied", value: 12 },
                            { title: "Saved Jobs", value: 5 },
                            { title: "Profile Views", value: 34 },
                            { title: "Interviews Scheduled", value: 2 },
                        ]}
                    />
                </div>
            </div>

            {/* Middle Row: Recent Applications + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Recent Applications */}
                <div className="lg:col-span-2 h-full">
                    <RecentApplications />
                </div>

                {/* Right: Recommended + Saved Jobs */}
                <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                    <RecommendedJobs />
                    <SavedJobsPreview />
                </div>
            </div>
        </div>
    );
}
