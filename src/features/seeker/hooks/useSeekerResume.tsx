import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, uploadResume, deleteResume } from "../services/profile.service";
import { Resume } from "../types/seeker";
import Loader from "@/components/common/Loader";

export const useSeekerResume = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading: isProfileLoading } = useQuery({
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

    // Combined loading state
    const isLoading =
        isProfileLoading || uploadMutation.isPending || deleteMutation.isPending;

    return {
        resume: profile?.resumes || [] as Resume[],
        uploadResume: (file: File) => uploadMutation.mutate(file),
        deleteResume: (resumeId: number) => deleteMutation.mutate(resumeId),
        isLoading,
        loader: isLoading ? <Loader /> : null,
    };
};
