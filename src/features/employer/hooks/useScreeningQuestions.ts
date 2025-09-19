// src/features/employer/hooks/useScreeningQuestions.ts
"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import {
    createScreeningQuestion,
    getScreeningQuestionsByJob,
    getScreeningQuestion,
    updateScreeningQuestion,
    deleteScreeningQuestion,
    ScreeningQuestionInput,
    UpdateScreeningQuestionInput,
} from "@/features/employer/services/screeningQuestions.service";
import { BackendError } from "@/lib/models/backend-error.model";

export function useScreeningQuestions(jobId?: string | number) {
    // ---------------------- Queries ----------------------

    const {
        data: questions,
        isLoading: isQuestionsLoading,
        refetch: refetchQuestions,
    } = useQuery({
        queryKey: ["screening-questions", jobId],
        queryFn: () => (jobId ? getScreeningQuestionsByJob(jobId) : []),
        enabled: !!jobId, // Only run if jobId is provided
        staleTime: 1000 * 60 * 5, // 5 mins
    });

    const getQuestionById = async (id: string | number) => {
        const data = await getScreeningQuestion(id);
        return data;
    };

    // ---------------------- Mutations ----------------------

    const createQuestionMutation = useMutation({
        mutationFn: ({ jobId, data }: { jobId: string | number; data: ScreeningQuestionInput }) =>
            createScreeningQuestion(jobId, data),
        onSuccess: () => refetchQuestions(),
        onError: (errors: BackendError[]) => errors,
    });

    const updateQuestionMutation = useMutation({
        mutationFn: ({ id, data }: { id: string | number; data: UpdateScreeningQuestionInput }) =>
            updateScreeningQuestion(id, data),
        onSuccess: () => refetchQuestions(),
        onError: (errors: BackendError[]) => errors,
    });

    const deleteQuestionMutation = useMutation({
        mutationFn: (id: string | number) => deleteScreeningQuestion(id),
        onSuccess: () => refetchQuestions(),
        onError: (errors: BackendError[]) => errors,
    });

    return {
        // Queries
        questions,
        isQuestionsLoading,
        refetchQuestions,
        getQuestionById,

        // Mutations
        createQuestionMutation,
        updateQuestionMutation,
        deleteQuestionMutation,
    };
}
