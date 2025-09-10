"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
    setupEmployer,
    submitKyc,
    getEmployerStatus,
    getOnboardingRedirect,
    approveKyc,
    rejectKyc,
    RejectKycInput
} from "@/features/employer/services/verification.service";
import { BackendError } from "@/lib/models/backend-error.model";

export function useEmployer() {
    const {
        data: status,
        isLoading: isStatusLoading,
        refetch: refetchStatus,
    } = useQuery({
        queryKey: ["employer-status"],
        queryFn: getEmployerStatus,
        staleTime: 1000 * 60 * 5,
    });

    const {
        data: redirectData,
        isLoading: isRedirectLoading,
        refetch: refetchRedirect,
    } = useQuery({
        queryKey: ["employer-onboarding-redirect"],
        queryFn: getOnboardingRedirect,
    });

    const setupMutation = useMutation({
        mutationFn: setupEmployer,
        onSuccess: () => {
            refetchStatus();
            refetchRedirect();
        },
        onError: (errors: BackendError[]) => errors,
    });

    const kycMutation = useMutation({
        mutationFn: submitKyc,
        onSuccess: () => {
            refetchStatus();
            refetchRedirect();
        },
        onError: (errors: BackendError[]) => errors,
    });

    const approveKycMutation = useMutation({
        mutationFn: approveKyc,
        onSuccess: () => refetchStatus(),
        onError: (errors: BackendError[]) => errors,
    });

    const rejectKycMutation = useMutation({
        mutationFn: (data: RejectKycInput) => rejectKyc(data),
        onSuccess: () => refetchStatus(),
        onError: (errors: BackendError[]) => errors,
    });

    return {
        status,
        isStatusLoading,
        setupMutation,
        kycMutation,
        redirectData,
        isRedirectLoading,
        refetchStatus,
        refetchRedirect,
        approveKycMutation,
        rejectKycMutation,
    };
}
