import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applyJob, withdrawApplication, listApplications, getApplication } from "../services/applications.service";
import { JobApplication, ApplyJobPayload, WithdrawApplicationPayload } from "../types/applications";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";

/**
 * useApplications
 * @param enabled - whether the hook should run (only true for job seekers)
 */
export const useApplications = (enabled: boolean = true) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const isJobSeeker = user?.role === "SEEKER";
    const shouldRun = !!user && isJobSeeker && enabled;

    const { data: applications, isLoading: isApplicationsLoading } = useQuery<JobApplication[]>({
        queryKey: ["applications"],
        queryFn: listApplications,
        enabled: shouldRun,
    });

    const applyMutation = useMutation({
        mutationFn: (payload: ApplyJobPayload) => applyJob(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
    });

    const withdrawMutation = useMutation({
        mutationFn: (payload: WithdrawApplicationPayload) => withdrawApplication(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
    });

    const getApplicationMutation = useMutation({
        mutationFn: (applicationId: string | number) => getApplication(applicationId),
    });

    const isLoading = shouldRun && (isApplicationsLoading || applyMutation.isPending || withdrawMutation.isPending);

    return {
        applications: applications || [],
        applyToJob: async (payload: ApplyJobPayload) => await applyMutation.mutateAsync(payload),
        withdrawApplication: async (payload: WithdrawApplicationPayload) => await withdrawMutation.mutateAsync(payload),
        getApplication: async (applicationId: string | number) => await getApplicationMutation.mutateAsync(applicationId),
        isLoading,
        loader: isLoading ? <Loader /> : null,
    };
};
