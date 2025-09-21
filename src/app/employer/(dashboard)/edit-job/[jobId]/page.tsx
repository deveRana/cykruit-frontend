"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useJobById } from "@/features/employer/hooks/useJobById";
import EditJobForm from "./EditJobForm";

export default function EditJobPage() {
    const router = useRouter();
    const params = useParams();

    // handle array params from Next.js
    const jobId = Array.isArray(params.jobId) ? params.jobId[0] : params.jobId;

    const { job, isLoading, isError } = useJobById(jobId);

    if (isLoading) return <p>Loading job data...</p>;
    if (isError || !job) return <p>Failed to load job data</p>;

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-lg">
            <EditJobForm job={job} onSuccess={() => router.push("/employer/jobs")} />
        </div>
    );
}
