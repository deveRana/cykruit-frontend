import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, updateBasicInfo, updateLinks, uploadProfilePicture } from "../services/profile.service";
import { JobSeeker } from "../types/seeker";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/common/Loader";

// Payload types
type BasicInfoPayload = {
    bio?: string;
    location?: string;
};

type LinksPayload = {
    github?: string;
    linkedin?: string;
    personalWebsite?: string;
};

export const useSeekerProfile = () => {
    const queryClient = useQueryClient();
    const { refetchMe } = useAuth();

    // Fetch Profile
    const { data: profile, isLoading: isProfileLoading } = useQuery<JobSeeker>({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Update basic info (bio + location)
    const updateProfileMutation = useMutation<JobSeeker, unknown, BasicInfoPayload>({
        mutationFn: updateBasicInfo,
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
            refetchMe();
        },
        onError: (err) => {
            console.error("❌ Failed to update profile:", err);
        },
    });

    // Update profile picture (auto upload on select)
    const updateProfilePicMutation = useMutation<JobSeeker, unknown, File>({
        mutationFn: uploadProfilePicture,
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
            refetchMe();
        },
        onError: (err) => {
            console.error("❌ Failed to upload profile picture:", err);
        },
    });

    // Update links (github, linkedin, personalWebsite)
    const updateLinksMutation = useMutation<JobSeeker, unknown, LinksPayload>({
        mutationFn: updateLinks,
        onSuccess: (data) => {
            queryClient.setQueryData(["profile"], data);
            refetchMe();
        },
        onError: (err) => {
            console.error("❌ Failed to update links:", err);
        },
    });

    const isLoading =
        isProfileLoading ||
        updateProfileMutation.isPending ||
        updateLinksMutation.isPending ||
        updateProfilePicMutation.isPending;

    return {
        profile,
        isLoading,
        loader: isLoading ? <Loader /> : null,

        // actions
        updateProfile: (data: BasicInfoPayload) => updateProfileMutation.mutate(data),
        updateLinks: (data: LinksPayload) => updateLinksMutation.mutate(data),
        updateProfilePic: (file: File) => updateProfilePicMutation.mutate(file),
    };
};
