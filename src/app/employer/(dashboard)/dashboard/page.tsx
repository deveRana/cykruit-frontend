"use client";

import React from "react";
import EmployerWelcomeCard from "@/components/employer/dashboard/EmployerWelcomeCard";
import EmployerStatsGrid from "@/components/employer/dashboard/EmployerStatsGrid";
import CompanyProfileCompletion from "@/components/employer/dashboard/CompanyProfileCompletion";
import RecentApplicants from "@/components/employer/dashboard/RecentApplicants";
import JobPostingsPreview from "@/components/employer/dashboard/JobPostingsPreview";
import RecommendedCandidates from "@/components/employer/dashboard/RecommendedCandidates";

export default function EmployerDashboardPage() {
  return (
    <div className="space-y-10">
      {/* Welcome Card */}
      <EmployerWelcomeCard />

      {/* Top Row: Company Profile Completion + Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <CompanyProfileCompletion progress={60} />
        </div>
        <div className="lg:col-span-4">
          <EmployerStatsGrid
            stats={[
              { title: "Jobs Posted", value: 8 },
              { title: "Active Applicants", value: 24 },
              { title: "Interviews Scheduled", value: 6 },
              { title: "Profile Views", value: 102 },
            ]}
          />
        </div>
      </div>

      {/* Middle Row: Recent Applicants + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Recent Applicants */}
        <div className="lg:col-span-2 h-full">
          <RecentApplicants />
        </div>

        {/* Right: Recommended Candidates + Job Postings Preview */}
        <div className="lg:col-span-1 flex flex-col gap-6 h-full">
          <RecommendedCandidates />
          <JobPostingsPreview />
        </div>
      </div>
    </div>
  );
}
