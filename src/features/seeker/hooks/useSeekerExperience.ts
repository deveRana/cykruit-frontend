import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getProfile,
    addExperience,
    updateExperience,
    removeExperience,
} from "../services/profile.service";
import { Experience } from "../types/seeker";

export const useSeekerExperience = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
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

    // Delete experience
    const deleteExpMutation = useMutation({
        mutationFn: (ids: number[]) => removeExperience(ids),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    return {
        experience: profile?.experience || [],
        isLoading,
        addExperience: (exp: Partial<Experience>) => addExpMutation.mutate(exp),
        updateExperience: (id: number, data: Partial<Experience>) =>
            updateExpMutation.mutate({ id, data }),
        deleteExperience: (ids: number[]) => deleteExpMutation.mutate(ids),
    };
};
