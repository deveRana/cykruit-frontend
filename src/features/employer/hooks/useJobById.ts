"use client";

import { useQuery } from "@tanstack/react-query";
import { getJob } from "@/features/employer/services/postJob.service";

export function useJobById(jobId?: string | number) {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["job", jobId],
        queryFn: () => getJob(jobId!),
        enabled: !!jobId,
    });

    return {
        job: data,
        isLoading,
        isError,
        refetch,
    };
}
