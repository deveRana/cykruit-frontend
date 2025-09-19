"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { usePostJob } from "@/features/employer/hooks/usePostJob";
import { Loader2 } from "lucide-react";

export default function JobsPage() {
    const { jobs, isJobsLoading } = usePostJob();

    return (
        <div className="p-8 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">My Jobs</h1>
                <Button size="lg">+ Post New Job</Button>
            </div>

            {/* Loading state */}
            {isJobsLoading && (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    <span className="ml-2 text-muted-foreground">Loading jobs...</span>
                </div>
            )}

            {/* Empty state */}
            {!isJobsLoading && (!jobs || jobs.length === 0) && (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                    <Briefcase className="w-12 h-12 text-muted-foreground" />
                    <h2 className="text-lg font-semibold">No jobs found</h2>
                    <p className="text-sm text-muted-foreground">
                        You haven’t posted any jobs yet. Create your first job to get started.
                    </p>
                    <Button size="lg">+ Create Job</Button>
                </div>
            )}

            {/* Jobs List */}
            {!isJobsLoading && jobs && jobs.length > 0 && (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {jobs.map((job: any) => (
                        <Card
                            key={job.id}
                            className="shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow duration-200"
                        >
                            <CardHeader className="pb-3">
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

                            <CardContent className="space-y-4 text-sm text-muted-foreground">
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
                                <div className="flex justify-between pt-4">
                                    <Button variant="outline" size="sm" className="rounded-full">
                                        Edit
                                    </Button>
                                    <Button variant="secondary" size="sm" className="rounded-full">
                                        View
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
