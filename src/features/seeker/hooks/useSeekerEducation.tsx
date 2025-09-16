import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, addEducation, updateEducation, removeEducation } from "../services/profile.service";
import { Education } from "../types/seeker";
import Loader from "@/components/common/Loader";

export const useSeekerEducation = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Add Education
    const addEduMutation = useMutation({
        mutationFn: (edu: Partial<Education>) => addEducation(edu),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Update Education
    const updateEduMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Education> }) =>
            updateEducation(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Delete Education
    const deleteEduMutation = useMutation({
        mutationFn: (educationId: number) => removeEducation(educationId), // ✅ updated to match new API
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const isLoading =
        isProfileLoading ||
        addEduMutation.isPending ||
        updateEduMutation.isPending ||
        deleteEduMutation.isPending;

    return {
        education: profile?.education || [],
        addEducation: (edu: Partial<Education>) => addEduMutation.mutate(edu),
        updateEducation: (id: number, data: Partial<Education>) =>
            updateEduMutation.mutate({ id, data }),
        deleteEducation: (educationId: number) => deleteEduMutation.mutate(educationId), // ✅ single ID
        isLoading,
        loader: isLoading ? <Loader /> : null,
    };
};
