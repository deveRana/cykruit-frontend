"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    setupEmployer,
    submitKyc,
    getEmployerStatus,
    getOnboardingRedirect,
    approveKyc,
    rejectKyc,
    RejectKycInput,
    SetupEmployerInput,
} from "@/features/employer/services/verification.service";
import Loader from "@/components/common/loader";

export const useEmployer = () => {
    const queryClient = useQueryClient();

    // ----------- Queries -----------
    const statusQuery = useQuery({
        queryKey: ["employer-status"],
        queryFn: getEmployerStatus,
        staleTime: 1000 * 60 * 5,
    });

    const redirectQuery = useQuery({
        queryKey: ["employer-onboarding-redirect"],
        queryFn: getOnboardingRedirect,
    });

    // ----------- Mutations with Optimistic Updates -----------
    const setupMutation = useMutation({
        mutationFn: (data: SetupEmployerInput) => setupEmployer(data),
        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: ["employer-status"] });
            const previousStatus = queryClient.getQueryData(["employer-status"]);
            queryClient.setQueryData(["employer-status"], (old: any) => ({
                ...old,
                ...newData,
            }));
            return { previousStatus };
        },
        onError: (err, newData, context) => {
            if (context?.previousStatus) {
                queryClient.setQueryData(["employer-status"], context.previousStatus);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["employer-status"] });
            queryClient.invalidateQueries({ queryKey: ["employer-onboarding-redirect"] });
        },
    });

    const kycMutation = useMutation({
        mutationFn: (formData: FormData) => submitKyc(formData),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["employer-status"] });
            queryClient.invalidateQueries({ queryKey: ["employer-onboarding-redirect"] });
        },
    });

    const approveKycMutation = useMutation({
        mutationFn: (kycId: string) => approveKyc(kycId),
        onMutate: async () => {
            const previousStatus = queryClient.getQueryData(["employer-status"]);
            queryClient.setQueryData(["employer-status"], (old: any) => ({
                ...old,
                kycStatus: "APPROVED",
            }));
            return { previousStatus };
        },
        onError: (err, _, context) => {
            if (context?.previousStatus) {
                queryClient.setQueryData(["employer-status"], context.previousStatus);
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["employer-status"] }),
    });

    const rejectKycMutation = useMutation({
        mutationFn: (data: RejectKycInput) => rejectKyc(data),
        onMutate: async () => {
            const previousStatus = queryClient.getQueryData(["employer-status"]);
            queryClient.setQueryData(["employer-status"], (old: any) => ({
                ...old,
                kycStatus: "REJECTED",
            }));
            return { previousStatus };
        },
        onError: (err, _, context) => {
            if (context?.previousStatus) {
                queryClient.setQueryData(["employer-status"], context.previousStatus);
            }
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["employer-status"] }),
    });

    // ----------- Global Loading State -----------
    const isLoading =
        statusQuery.isLoading ||
        redirectQuery.isLoading ||
        setupMutation.isPending ||
        kycMutation.isPending ||
        approveKycMutation.isPending ||
        rejectKycMutation.isPending;

    // ----------- Return Interface -----------
    return {
        status: statusQuery.data,
        redirectData: redirectQuery.data,
        isLoading,
        loader: isLoading ? <Loader /> : null,

        // Async mutation functions
        setupEmployer: async (data: SetupEmployerInput) => await setupMutation.mutateAsync(data),
        submitKyc: async (formData: FormData) => await kycMutation.mutateAsync(formData),
        approveKyc: async (kycId: string) => await approveKycMutation.mutateAsync(kycId),
        rejectKyc: async (data: RejectKycInput) => await rejectKycMutation.mutateAsync(data),

        // Manual refetch functions
        refetchStatus: statusQuery.refetch,
        refetchRedirect: redirectQuery.refetch,
    };
};
