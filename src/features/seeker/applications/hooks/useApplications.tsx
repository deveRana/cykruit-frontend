import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { applyJob, withdrawApplication, listApplications, getApplication } from "../services/applications.service";
import { JobApplication, ApplyJobPayload, WithdrawApplicationPayload } from "../types/applications";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useApplications = (enabled: boolean = true) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const isJobSeeker = user?.role === "SEEKER";

    // Always call useQuery
    const { data: applications, isLoading: isApplicationsLoading } = useQuery<JobApplication[]>({
        queryKey: ["applications"],
        queryFn: listApplications,
        enabled: !!user && isJobSeeker && enabled, // only fetch if user is job seeker
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

    const isLoading = !!user && isJobSeeker && enabled && (isApplicationsLoading || applyMutation.isPending || withdrawMutation.isPending);

    return {
        applications: applications || [],
        applyToJob: (payload: ApplyJobPayload) => applyMutation.mutateAsync(payload),
        withdrawApplication: (payload: WithdrawApplicationPayload) => withdrawMutation.mutateAsync(payload),
        getApplication: (applicationId: string | number) => getApplicationMutation.mutateAsync(applicationId),
        isLoading,
        loader: isLoading ? <Loader /> : null,
    };
};
