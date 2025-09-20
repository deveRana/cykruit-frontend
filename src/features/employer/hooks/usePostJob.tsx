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
    getAllRoles,
    getAllLocations,
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
        isError: isJobsError,
        error: jobsError,
        refetch: refetchJobs,
    } = useQuery({
        queryKey: ["employer-jobs"],
        queryFn: async () => {
            try {
                const res = await getJobsByEmployer();
                return res.data;
            } catch (err) {
                throw err;
            }
        },
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: job,
        isLoading: isJobLoading,
        isError: isJobError,
        error: jobError,
        refetch: refetchJob,
    } = useQuery({
        queryKey: ["employer-job"],
        queryFn: () => null,
        enabled: false,
    });

    // ---------------------- MASTER DATA QUERIES ----------------------
    const { data: skills, isLoading: isSkillsLoading, isError: isSkillsError } = useQuery({
        queryKey: ["meta-skills"],
        queryFn: async () => {
            try {
                const res = await getAllSkills();
                console.log("Skills API Response:", res);
                return res;
            } catch (err) {
                console.error("Skills API Error:", err);
                throw err;
            }
        },
        staleTime: 1000 * 60 * 10,
    });

    const { data: certifications, isLoading: isCertificationsLoading } = useQuery({
        queryKey: ["meta-certifications"],
        queryFn: getAllCertifications,
        staleTime: 1000 * 60 * 10,
    });

    const { data: roles, isLoading: isRolesLoading } = useQuery({
        queryKey: ["meta-roles"],
        queryFn: getAllRoles,
        staleTime: 1000 * 60 * 10,
    });

    const { data: locations, isLoading: isLocationsLoading } = useQuery({
        queryKey: ["meta-locations"],
        queryFn: getAllLocations,
        staleTime: 1000 * 60 * 10,
    });

    // ---------------------- JOB MUTATIONS ----------------------
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

    // ---------------------- UTIL ----------------------
    const getJobById = async (jobId: string | number) => {
        try {
            const data = await getJob(jobId);
            console.log("Get Job By ID Response:", data);
            return data;
        } catch (err) {
            console.error("Get Job By ID Error:", err);
            throw err;
        }
    };

    return {
        // Jobs
        jobs,
        isJobsLoading,
        isJobsError,
        jobsError,
        refetchJobs,
        job,
        isJobLoading,
        isJobError,
        jobError,
        refetchJob,
        getJobById,

        // Master Data
        skills,
        isSkillsLoading,
        isSkillsError,
        certifications,
        isCertificationsLoading,
        roles,
        isRolesLoading,
        locations,
        isLocationsLoading,

        // Mutations
        createJobMutation,
        updateJobMutation,
        changeJobStatusMutation,
    };
}
