import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateBasicInfo, updateLinks } from "../services/profile.service";
import { JobSeeker } from "../types/seeker";

export const useSeekerProfile = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading } = useQuery<JobSeeker>({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Update basic profile info
    const updateProfileMutation = useMutation<JobSeeker, unknown, Partial<JobSeeker>>({
        mutationFn: (updatedData) => updateBasicInfo(updatedData),
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
        },
    });

    // Update links
    const updateLinksMutation = useMutation<JobSeeker, unknown, any>({
        mutationFn: (linksData) => updateLinks(linksData),
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
        },
    });

    return {
        profile,
        isLoading,
        updateProfile: (data: Partial<JobSeeker>) => updateProfileMutation.mutate(data),
        updateLinks: (data: any) => updateLinksMutation.mutate(data),
    };
};
