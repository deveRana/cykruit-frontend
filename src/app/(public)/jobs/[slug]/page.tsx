"use client";

import JobDetailsSection from "@/components/jobs-slug/JobDetailsSection";
import Navbar from "@/components/layout/Navbar";
import React from "react";

export default function JobDetailsPage() {
    return (
        <>
            <div className="bg-[url('/assets/home/home-page-hero-img.svg')] bg-cover bg-center bg-no-repeat">
                <Navbar />
            </div>
            <div className="max-w-6xl mx-auto p-6 sm:p-12">
                <JobDetailsSection />
            </div>
        </>
    );
}