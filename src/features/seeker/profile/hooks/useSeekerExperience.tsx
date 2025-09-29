import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, addExperience, updateExperience, removeExperience } from "../services/profile.service";
import { Experience } from "../types/seeker";
import Loader from "@/components/common/loader";

export const useSeekerExperience = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Add experience
    const addExpMutation = useMutation({
        mutationFn: (exp: Partial<Experience>) => addExperience(exp),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Update experience
    const updateExpMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<Experience> }) =>
            updateExperience(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Delete experience (single item)
    const deleteExpMutation = useMutation({
        mutationFn: (id: number) => removeExperience(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Central loading state
    const isLoading =
        isProfileLoading ||
        addExpMutation.isPending ||
        updateExpMutation.isPending ||
        deleteExpMutation.isPending;

    return {
        experience: profile?.experience || [],
        isLoading,
        loader: isLoading ? <Loader /> : null, // 🔹 central loader
        addExperience: (exp: Partial<Experience>) => addExpMutation.mutate(exp),
        updateExperience: (id: number, data: Partial<Experience>) =>
            updateExpMutation.mutate({ id, data }),
        deleteExperience: (id: number) => deleteExpMutation.mutate(id),
    };
};
