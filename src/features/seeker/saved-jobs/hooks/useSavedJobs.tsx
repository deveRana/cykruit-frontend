// src/features/seeker/saved-jobs/hooks/useSavedJobs.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    listSavedJobs,
    saveJob,
    removeSavedJob,
} from "../services/saved-job.service";
import { SavedJob } from "../types/saved-job";
import Loader from "@/components/common/Loader";

// Hook
export const useSavedJobs = () => {
    const queryClient = useQueryClient();

    // Fetch saved jobs
    const {
        data: savedJobs,
        isLoading: isSavedJobsLoading,
        refetch: refetchSavedJobs,
    } = useQuery<SavedJob[]>({
        queryKey: ["savedJobs"],
        queryFn: listSavedJobs,
    });

    // Save a job
    const saveJobMutation = useMutation<SavedJob, unknown, string>({
        mutationFn: saveJob,
        onSuccess: (newJob) => {
            // Update query cache
            queryClient.setQueryData<SavedJob[]>(["savedJobs"], (old = []) => [newJob, ...old]);
        },
        onError: (err) => {
            console.error("❌ Failed to save job:", err);
        },
    });

    // Remove a saved job
    const removeJobMutation = useMutation<{ success: boolean }, unknown, string>({
        mutationFn: removeSavedJob,
        onSuccess: (_, jobId) => {
            queryClient.setQueryData<SavedJob[]>(["savedJobs"], (old = []) =>
                old.filter((job) => job.jobId !== jobId)
            );
        },
        onError: (err) => {
            console.error("❌ Failed to remove saved job:", err);
        },
    });

    // Combined loading state
    const isLoading =
        isSavedJobsLoading || saveJobMutation.isPending || removeJobMutation.isPending;

    return {
        savedJobs,
        isLoading,
        loader: isLoading ? <Loader /> : null,
        refetchSavedJobs,
        saveJob: (jobId: string) => saveJobMutation.mutate(jobId),
        removeSavedJob: (jobId: string) => removeJobMutation.mutate(jobId),
    };
};
