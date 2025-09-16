import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateBasicInfo, updateLinks } from "../services/profile.service";
import { JobSeeker } from "../types/seeker";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/common/Loader";

export const useSeekerProfile = () => {
    const queryClient = useQueryClient();
    const { refetchMe } = useAuth();

    const { data: profile, isLoading: isProfileLoading } = useQuery<JobSeeker>({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    const updateProfileMutation = useMutation<JobSeeker, unknown, Partial<JobSeeker>>({
        mutationFn: (updatedData) => updateBasicInfo(updatedData),
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
            refetchMe();
        },
    });

    const updateLinksMutation = useMutation<JobSeeker, unknown, any>({
        mutationFn: (linksData) => updateLinks(linksData),
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
            refetchMe();
        },
    });

    const isLoading =
        isProfileLoading ||
        updateProfileMutation.isPending ||
        updateLinksMutation.isPending;

    return {
        profile,
        isLoading,
        loader: isLoading ? <Loader /> : null, // 🔹 central loader
        updateProfile: (data: Partial<JobSeeker>) => updateProfileMutation.mutate(data),
        updateLinks: (data: any) => updateLinksMutation.mutate(data),
    };
};
