import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, getAllCertifications, addCertification, removeCertification } from "../services/profile.service";
import { Certification } from "../types/seeker";
import Loader from "@/components/common/Loader";

export const useSeekerCertifications = () => {
    const queryClient = useQueryClient();

    // Fetch profile
    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    // Fetch all master certifications
    const { data: allCerts = [], isLoading: isAllCertsLoading } = useQuery({
        queryKey: ["allCertifications"],
        queryFn: getAllCertifications,
    });

    // Add certification mutation (backend expects certificationId as string)
    const addCertMutation = useMutation({
        mutationFn: (certId: string) => addCertification({ certificationId: certId }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Remove certification mutation (backend expects certificationId as string)
    const removeCertMutation = useMutation({
        mutationFn: (certId: string) => removeCertification(certId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const isLoading = isProfileLoading || isAllCertsLoading || addCertMutation.isPending || removeCertMutation.isPending;

    // Map user certifications
    const certifications = profile?.jobSeekerCertifications?.map((c: any) => ({
        userCertId: c.id,
        certId: c.certification.id,
        name: c.certification.name
    })) || [];

    return {
        certifications,
        allCerts,
        isLoading,
        loader: isLoading ? <Loader /> : null,
        addCertification: (certId: string) => addCertMutation.mutate(certId),
        removeCertification: (userCertId: string) => removeCertMutation.mutate(userCertId),
    };
};
