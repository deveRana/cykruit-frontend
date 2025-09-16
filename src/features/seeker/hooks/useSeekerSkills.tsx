import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, getAllSkills, addSkill, removeSkill } from "../services/profile.service";
import { Skill } from "../types/seeker";
import Loader from "@/components/common/Loader";

export const useSeekerSkills = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Fetch all master skills for suggestions
    const { data: allSkills = [], isLoading: isAllSkillsLoading } = useQuery({
        queryKey: ["allSkills"],
        queryFn: getAllSkills,
    });

    // Add skill mutation (expects { skills: [id] })
    const addSkillMutation = useMutation({
        mutationFn: (skillId: number) => addSkill({ skills: [skillId] }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Remove skill mutation
    const removeSkillMutation = useMutation({
        mutationFn: (skillId: number) => removeSkill(skillId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const isLoading = isProfileLoading || isAllSkillsLoading || addSkillMutation.isPending || removeSkillMutation.isPending;

    // Map user's skills to use skill object directly
    const skills = profile?.skills?.map((s: any) => ({
        userSkillId: s.id,         // ID of the mapping
        skillId: s.skill.id,       // actual skill ID
        name: s.skill.name
    })) || [];

    return {
        skills,
        allSkills,
        isLoading,
        loader: isLoading ? <Loader /> : null,
        addSkill: (skillId: number) => addSkillMutation.mutate(skillId),
        removeSkill: (userSkillId: number) => removeSkillMutation.mutate(userSkillId),
    };
};
