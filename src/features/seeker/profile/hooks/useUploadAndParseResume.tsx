import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadAndParseResume } from "../services/profile.service";
import { useAuth } from "@/features/auth/hooks/useAuth";
import Loader from "@/components/common/Loader";

export const useUploadAndParseResume = () => {
    const queryClient = useQueryClient();
    const { refetchMe } = useAuth();

    const mutation = useMutation({
        mutationFn: uploadAndParseResume,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            refetchMe();
        },
        onError: (err) => {
            console.error("❌ Failed to upload & parse resume:", err);
        },
    });

    return {
        uploadResume: (file: File) => mutation.mutate(file),
        isUploading: mutation.isPending,
        loader: mutation.isPending ? <Loader /> : null,
        data: mutation.data, // parsed data returned from API
        error: mutation.error,
    };
};
