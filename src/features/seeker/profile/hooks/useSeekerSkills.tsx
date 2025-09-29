import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, getAllSkills, addSkill, removeSkill } from "../services/profile.service";
import Loader from "@/components/common/loader";

interface UserSkill {
    id: number; // mapping ID
    skill: {
        id: number;
        name: string;
    };
}

interface Skill {
    userSkillId: number;
    skillId: number;
    name: string;
}

export const useSeekerSkills = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Fetch all master skills
    const { data: allSkills = [], isLoading: isAllSkillsLoading } = useQuery({
        queryKey: ["allSkills"],
        queryFn: getAllSkills,
    });

    // Add skill mutation
    const addSkillMutation = useMutation({
        mutationFn: (skillId: number) => addSkill({ skills: [skillId] }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Remove skill mutation
    const removeSkillMutation = useMutation({
        mutationFn: (skillId: number) => removeSkill(skillId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const isLoading =
        isProfileLoading ||
        isAllSkillsLoading ||
        addSkillMutation.isPending ||
        removeSkillMutation.isPending;

    // ✅ Fix: tell TypeScript the incoming array is UserSkill[]
    const skills: Skill[] =
        (profile?.skills as UserSkill[] | undefined)?.map((s) => ({
            userSkillId: s.id,
            skillId: s.skill.id,
            name: s.skill.name,
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
