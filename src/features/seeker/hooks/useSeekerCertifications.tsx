import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, getAllCertifications, addCertification, removeCertification } from "../services/profile.service";
import { Certification } from "../types/seeker";
import Loader from "@/components/common/Loader";

export const useSeekerCertifications = () => {
    const queryClient = useQueryClient();

    const { data: profile, isLoading: isProfileLoading } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });

    const { data: allCerts = [], isLoading: isAllCertsLoading } = useQuery({
        queryKey: ["allCertifications"],
        queryFn: getAllCertifications,
    });

    // Add certification mutation (backend now expects number)
    const addCertMutation = useMutation({
        mutationFn: (certId: number) => addCertification({ certificationId: certId }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    // Remove certification mutation
    const removeCertMutation = useMutation({
        mutationFn: (certId: number) => removeCertification(certId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const isLoading = isProfileLoading || isAllCertsLoading || addCertMutation.isPending || removeCertMutation.isPending;

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
        addCertification: (certId: number) => addCertMutation.mutate(certId),
        removeCertification: (userCertId: number) => removeCertMutation.mutate(userCertId),
    };
};
