import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, uploadResume, deleteResume } from "../services/profile.service";
import { Resume } from "../types/seeker";

export const useSeekerResume = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Upload resume mutation
    const uploadMutation = useMutation({
        mutationFn: (file: File) => uploadResume(file),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Delete resume mutation
    const deleteMutation = useMutation({
        mutationFn: (resumeId: number) => deleteResume(resumeId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    return {
        resume: profile?.resumes || [] as Resume[],
        isLoading,
        uploadResume: (file: File) => uploadMutation.mutate(file),
        deleteResume: (resumeId: number) => deleteMutation.mutate(resumeId),
    };
};
