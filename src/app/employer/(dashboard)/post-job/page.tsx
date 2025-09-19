"use client";

import React from "react";
import PostJobForm from "./PostJobForm";

export default function PostJobPage() {
    return (
        <div className="space-y-10 max-w-6xl mx-auto p-6">
            {/* Page Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-[var(--foreground)]">
                    Post a New Job
                </h1>
            </div>

            {/* Job Form */}
            <div className="bg-[var(--background)]  ">
                <PostJobForm />
            </div>
        </div>
    );
}
