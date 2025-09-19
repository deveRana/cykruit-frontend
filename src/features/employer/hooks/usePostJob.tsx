"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    createJob,
    updateJob,
    changeJobStatus,
    getJobsByEmployer,
    getJob,
    getAllSkills,
    getAllCertifications,
    getAllRoles, // ✅ new
} from "@/features/employer/services/postJob.service";
import {
    CreateJobInput,
    UpdateJobInput,
    JobStatusEnum,
} from "@/features/employer/types/post-a-job";
import { BackendError } from "@/lib/models/backend-error.model";

export function usePostJob() {
    // ---------------------- JOB QUERIES ----------------------
    const {
        data: jobs,
        isLoading: isJobsLoading,
        refetch: refetchJobs,
    } = useQuery({
        queryKey: ["employer-jobs"],
        queryFn: getJobsByEmployer,
        staleTime: 1000 * 60 * 5, // 5 mins
    });

    const {
        data: job,
        isLoading: isJobLoading,
        refetch: refetchJob,
    } = useQuery({
        queryKey: ["employer-job"],
        queryFn: () => null, // call getJob dynamically
        enabled: false,
    });

    // ---------------------- MASTER DATA QUERIES ----------------------
    const {
        data: skills,
        isLoading: isSkillsLoading,
    } = useQuery({
        queryKey: ["meta-skills"],
        queryFn: getAllSkills,
        staleTime: 1000 * 60 * 10, // 10 mins
    });

    const {
        data: certifications,
        isLoading: isCertificationsLoading,
    } = useQuery({
        queryKey: ["meta-certifications"],
        queryFn: getAllCertifications,
        staleTime: 1000 * 60 * 10,
    });

    const {
        data: roles,
        isLoading: isRolesLoading,
    } = useQuery({
        queryKey: ["meta-roles"],
        queryFn: getAllRoles,
        staleTime: 1000 * 60 * 10,
    });

    // ---------------------- JOB MUTATIONS ----------------------
    const createJobMutation = useMutation({
        mutationFn: (data: CreateJobInput) => createJob(data),
        onSuccess: () => refetchJobs(),
        onError: (errors: BackendError[]) => errors,
    });

    const updateJobMutation = useMutation({
        mutationFn: ({ jobId, data }: { jobId: string | number; data: UpdateJobInput }) =>
            updateJob(jobId, data),
        onSuccess: () => refetchJobs(),
        onError: (errors: BackendError[]) => errors,
    });

    const changeJobStatusMutation = useMutation({
        mutationFn: ({ jobId, status }: { jobId: string | number; status: JobStatusEnum }) =>
            changeJobStatus(jobId, status),
        onSuccess: () => refetchJobs(),
        onError: (errors: BackendError[]) => errors,
    });

    // ---------------------- UTIL ----------------------
    const getJobById = async (jobId: string | number) => {
        const data = await getJob(jobId);
        return data;
    };

    return {
        // Jobs
        jobs,
        isJobsLoading,
        refetchJobs,
        job,
        isJobLoading,
        refetchJob,
        getJobById,

        // Master Data
        skills,
        isSkillsLoading,
        certifications,
        isCertificationsLoading,
        roles, // ✅ new
        isRolesLoading, // ✅ new

        // Mutations
        createJobMutation,
        updateJobMutation,
        changeJobStatusMutation,
    };
}
