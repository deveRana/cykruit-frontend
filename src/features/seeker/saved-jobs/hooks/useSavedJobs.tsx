import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listSavedJobs, saveJob, removeSavedJob } from "../services/saved-job.service";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { SavedJob } from "@/features/jobs/types/jobSlug"; // import the type

/**
 * useSavedJobs
 * @param enabled - whether the hook should run (only true for job seekers)
 */
export const useSavedJobs = (enabled: boolean = true) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const isJobSeeker = user?.role === "SEEKER";
    const shouldRun = !!user && isJobSeeker && enabled;

    // 🟢 use SavedJob[] from types
    const {
        data: savedJobs,
        isLoading: isSavedJobsLoading,
        refetch: refetchSavedJobs,
    } = useQuery<SavedJob[]>({
        queryKey: ["savedJobs"],
        queryFn: listSavedJobs,
        enabled: shouldRun,
    });

    // 🟢 save mutation returns a SavedJob
    const saveJobMutation = useMutation<SavedJob, unknown, string>({
        mutationFn: saveJob,
        onSuccess: (newJob) => {
            queryClient.setQueryData<SavedJob[]>(["savedJobs"], (old = []) => [newJob, ...old]);
        },
        onError: (err) => console.error("❌ Failed to save job:", err),
    });

    // 🟢 remove mutation returns success flag
    const removeJobMutation = useMutation<{ success: boolean }, unknown, string>({
        mutationFn: removeSavedJob,
        onSuccess: (_, jobId) => {
            queryClient.setQueryData<SavedJob[]>(["savedJobs"], (old = []) =>
                old.filter((job) => job.jobId !== jobId)
            );
        },
        onError: (err) => console.error("❌ Failed to remove saved job:", err),
    });

    const isLoading =
        shouldRun &&
        (isSavedJobsLoading || saveJobMutation.isPending || removeJobMutation.isPending);

    return {
        savedJobs: savedJobs || [],
        isLoading,
        loader: isLoading ? <Loader /> : null,
        refetchSavedJobs,
        saveJob: (jobId: string) => saveJobMutation.mutate(jobId),
        removeSavedJob: (jobId: string) => removeJobMutation.mutate(jobId),
    };
};
