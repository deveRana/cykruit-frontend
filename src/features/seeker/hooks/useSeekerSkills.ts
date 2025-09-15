import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, addSkill, removeSkill } from "../services/profile.service";
import { Skill } from "../types/seeker";

export const useSeekerSkills = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Add skill mutation
    const addSkillMutation = useMutation({
        mutationFn: (skill: Partial<Skill>) => addSkill(skill),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Remove skill mutation (backend expects array of IDs)
    const removeSkillMutation = useMutation({
        mutationFn: (skillIds: number[]) => removeSkill(skillIds),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    return {
        skills: profile?.skills || [] as Skill[],
        isLoading,
        addSkill: (skill: Partial<Skill>) => addSkillMutation.mutate(skill),
        removeSkill: (skillId: number) => removeSkillMutation.mutate([skillId]),
    };
};
