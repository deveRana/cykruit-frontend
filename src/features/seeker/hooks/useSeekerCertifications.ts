import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, addCertification, removeCertification } from "../services/profile.service";
import { Certification } from "../types/seeker";

export const useSeekerCertifications = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Add certification mutation
    const addCertMutation = useMutation({
        mutationFn: (cert: Partial<Certification>) => addCertification(cert),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Remove certification mutation (backend expects array of IDs)
    const removeCertMutation = useMutation({
        mutationFn: (certificationIds: number[]) => removeCertification(certificationIds),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    return {
        certifications: profile?.certifications || [] as Certification[],
        isLoading,
        addCertification: (cert: Partial<Certification>) => addCertMutation.mutate(cert),
        removeCertification: (certId: number) => removeCertMutation.mutate([certId]),
    };
};
