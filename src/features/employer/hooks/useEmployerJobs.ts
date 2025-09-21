"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    createJob,
    updateJob,
    changeJobStatus,
    getJobsByEmployer,
} from "@/features/employer/services/postJob.service";
import { CreateJobInput, UpdateJobInput, JobStatusEnum } from "@/features/employer/types/post-a-job";
import { BackendError } from "@/lib/models/backend-error.model";

export function useEmployerJobs() {
    const {
        data: response,
        isLoading,
        refetch: refetchJobs,
    } = useQuery({
        queryKey: ["employer-jobs"],
        queryFn: getJobsByEmployer,
        staleTime: 1000 * 60 * 5,
    });

    // Extract jobs from response
    const jobs = response?.data || [];

    const createJobMutation = useMutation({
        mutationFn: (data: CreateJobInput) => createJob(data),
        onSuccess: () => refetchJobs(),
        onError: (err: BackendError[]) => console.error("Create Job Error:", err),
    });

    const updateJobMutation = useMutation({
        mutationFn: ({ jobId, data }: { jobId: string | number; data: UpdateJobInput }) =>
            updateJob(jobId, data),
        onSuccess: () => refetchJobs(),
        onError: (err: BackendError[]) => console.error("Update Job Error:", err),
    });

    const changeJobStatusMutation = useMutation({
        mutationFn: ({ jobId, status }: { jobId: string | number; status: JobStatusEnum }) =>
            changeJobStatus(jobId, status),
        onSuccess: () => refetchJobs(),
        onError: (err: BackendError[]) => console.error("Change Job Status Error:", err),
    });

    return {
        jobs,
        isLoading,
        refetchJobs,
        createJobMutation,
        updateJobMutation,
        changeJobStatusMutation,
    };
}
