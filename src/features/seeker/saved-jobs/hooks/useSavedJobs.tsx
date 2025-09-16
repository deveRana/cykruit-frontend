import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listSavedJobs, saveJob, removeSavedJob } from "../services/saved-job.service";
import { SavedJob } from "../types/saved-job";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useSavedJobs = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth(); // ✅ get user

    // Fetch saved jobs only if user is logged in
    const {
        data: savedJobs,
        isLoading: isSavedJobsLoading,
        refetch: refetchSavedJobs,
    } = useQuery<SavedJob[]>({
        queryKey: ["savedJobs"],
        queryFn: listSavedJobs,
        enabled: !!user, // 👈 important: don't run if not logged in
    });

    // Save a job
    const saveJobMutation = useMutation<SavedJob, unknown, string>({
        mutationFn: saveJob,
        onSuccess: (newJob) => {
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

    const isLoading =
        (user && isSavedJobsLoading) || saveJobMutation.isPending || removeJobMutation.isPending;

    return {
        savedJobs: savedJobs || [], // 👈 empty list if logged out
        isLoading,
        loader: isLoading ? <Loader /> : null,
        refetchSavedJobs,
        saveJob: (jobId: string) => saveJobMutation.mutate(jobId),
        removeSavedJob: (jobId: string) => removeJobMutation.mutate(jobId),
    };
};
