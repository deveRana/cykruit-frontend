import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProfile, getAllCertifications, addCertification, removeCertification } from "../services/profile.service";
import Loader from "@/components/common/loader";


interface UserCertification {
    id: number;
    certification: {
        id: number;
        name: string;
    };
}

interface Certification {
    userCertId: number;
    certId: number;
    name: string;
}

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

    const addCertMutation = useMutation({
        mutationFn: (certId: number) => addCertification({ certificationId: certId }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const removeCertMutation = useMutation({
        mutationFn: (certId: number) => removeCertification(certId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
    });

    const isLoading =
        isProfileLoading ||
        isAllCertsLoading ||
        addCertMutation.isPending ||
        removeCertMutation.isPending;

    // ✅ Strongly typed mapping
    const certifications: Certification[] =
        profile?.jobSeekerCertifications?.map((c: UserCertification) => ({
            userCertId: c.id,
            certId: c.certification.id,
            name: c.certification.name,
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
