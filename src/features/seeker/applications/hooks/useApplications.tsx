import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    applyJob,
    withdrawApplication,
    listApplications,
    getApplication,
} from "../services/applications.service";
import { JobApplication, ApplyJobPayload, WithdrawApplicationPayload } from "../types/applications";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/features/auth/hooks/useAuth";

export const useApplications = () => {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    // Fetch all applications only if user exists
    const { data: applications, isLoading: isApplicationsLoading } = useQuery<JobApplication[]>({
        queryKey: ["applications"],
        queryFn: listApplications,
        enabled: !!user,
    });

    // Apply to a job
    const applyMutation = useMutation({
        mutationFn: (payload: ApplyJobPayload) => applyJob(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
    });

    // Withdraw an application
    const withdrawMutation = useMutation({
        mutationFn: (payload: WithdrawApplicationPayload) => withdrawApplication(payload),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["applications"] }),
    });

    // Get single application
    const getApplicationMutation = useMutation({
        mutationFn: (applicationId: string | number) => getApplication(applicationId),
    });

    const isLoading =
        (!!user && isApplicationsLoading) || applyMutation.isPending || withdrawMutation.isPending;

    return {
        applications: applications || [],
        applyToJob: (payload: ApplyJobPayload) => applyMutation.mutate(payload),
        withdrawApplication: (payload: WithdrawApplicationPayload) => withdrawMutation.mutate(payload),
        getApplication: (applicationId: string | number) =>
            getApplicationMutation.mutateAsync(applicationId),
        isLoading,
        loader: isLoading ? <Loader /> : null,
    };
};
