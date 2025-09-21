"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import Loader from "@/components/common/Loader";
import { useRouter } from "next/navigation";
import { useEmployerJobs } from "@/features/employer/hooks/useEmployerJobs";

export default function JobsPage() {
    const { jobs = [], isLoading: isJobsLoading } = useEmployerJobs();
    const router = useRouter();

    const handleCreateJob = () => {
        router.push("/employer/post-job");
    };

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">My Jobs</h1>
                <Button
                    size="lg"
                    onClick={handleCreateJob}
                    className="bg-primary text-white hover:bg-primary-dark"
                >
                    + Post New Job
                </Button>
            </div>

            {/* Loading state */}
            {isJobsLoading && <Loader />}

            {/* Empty state */}
            {!isJobsLoading && jobs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-32 text-center space-y-6">
                    <Briefcase className="w-14 h-14 text-muted-foreground" />
                    <h2 className="text-xl font-semibold text-foreground">No jobs found</h2>
                    <p className="text-sm text-muted-foreground max-w-xs">
                        You haven’t posted any jobs yet. Create your first job to start attracting candidates.
                    </p>
                    <Button
                        size="lg"
                        onClick={handleCreateJob}
                        className="bg-primary text-white hover:bg-primary-dark"
                    >
                        + Create Job
                    </Button>
                </div>
            )}

            {/* Jobs List */}
            {!isJobsLoading && jobs.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job: any) => (
                        <Card
                            key={job.id}
                            className="shadow-md rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="flex items-center justify-between">
                                    <span className="flex items-center gap-2 text-lg font-semibold">
                                        <Briefcase className="w-5 h-5 text-primary" />
                                        {job.title}
                                    </span>
                                    <Badge
                                        className="px-3 py-1 text-xs font-medium"
                                        variant={job.status === "ACTIVE" ? "default" : "secondary"}
                                    >
                                        {job.status}
                                    </Badge>
                                </CardTitle>
                            </CardHeader>

                            <CardContent className="space-y-3 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    <span>{job.location?.name || "—"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-primary" />
                                    <span>
                                        Valid Till:{" "}
                                        {job.validTill
                                            ? new Date(job.validTill).toLocaleDateString()
                                            : "—"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium text-foreground">Type:</span>
                                    <span>{job.employmentType}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-2 pt-4">
                                    <a href={`/employer/edit-job/${job.id}`}>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="rounded-full hover:bg-gray-100 transition-colors"
                                        >
                                            Edit
                                        </Button>
                                    </a>
                                    <a
                                        href={`/jobs/${job.slug}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button
                                            variant="secondary"
                                            size="sm"
                                            className="rounded-full hover:bg-primary/90 text-black transition-colors"
                                        >
                                            View
                                        </Button>
                                    </a>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
