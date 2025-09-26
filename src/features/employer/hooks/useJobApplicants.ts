"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    getApplicantsByJob,
    getApplicationDetails,
    getApplicationHistory,
    addApplicationNote,
    deleteApplicationNotes,
    updateApplicationStatus,
} from "@/features/employer/services/jobApplicants.service";
import { BackendError } from "@/lib/models/backend-error.model";
import {
    Applicant,
    ApplicationDetails,
    ApplicationHistory,
    ApplicationStatus,
} from "../types/applicants";

export function useJobApplicants(jobId?: string | number) {
    // ✅ Fetch applicants for a given job
    const {
        data: applicants,
        isLoading: isApplicantsLoading,
        refetch: refetchApplicants,
    } = useQuery<Applicant[], BackendError>({
        queryKey: ["job-applicants", jobId],
        queryFn: () => getApplicantsByJob(jobId!),
        enabled: !!jobId,
        staleTime: 1000 * 60 * 5,
    });

    // ✅ Fetch single application details
    const useApplicationDetails = (applicationId?: string | number) =>
        useQuery<ApplicationDetails, BackendError>({
            queryKey: ["application-details", applicationId],
            queryFn: () => getApplicationDetails(applicationId!),
            enabled: !!applicationId,
            staleTime: 1000 * 60 * 5,
        });

    // ✅ Fetch application history
    const useApplicationHistory = (applicationId?: string | number) =>
        useQuery<ApplicationHistory[], BackendError>({
            queryKey: ["application-history", applicationId],
            queryFn: () => getApplicationHistory(applicationId!),
            enabled: !!applicationId,
            staleTime: 1000 * 60 * 5,
        });

    // ✅ Mutations
    const addNoteMutation = useMutation({
        mutationFn: ({ applicationId, note }: { applicationId: string | number; note: string }) =>
            addApplicationNote(applicationId, note),
        onSuccess: () => refetchApplicants(),
        onError: (err: BackendError[]) => console.error("Add Note Error:", err),
    });

    const deleteNotesMutation = useMutation({
        mutationFn: (applicationId: string | number) => deleteApplicationNotes(applicationId),
        onSuccess: () => refetchApplicants(),
        onError: (err: BackendError[]) => console.error("Delete Notes Error:", err),
    });

    const updateStatusMutation = useMutation({
        mutationFn: ({
            applicationId,
            status,
        }: {
            applicationId: string | number;
            status: ApplicationStatus;
        }) => updateApplicationStatus(applicationId, status),
        onSuccess: () => refetchApplicants(),
        onError: (err: BackendError[]) => console.error("Update Status Error:", err),
    });

    return {
        applicants,
        isApplicantsLoading,
        refetchApplicants,
        useApplicationDetails,
        useApplicationHistory,
        addNoteMutation,
        deleteNotesMutation,
        updateStatusMutation,
    };
}
