'use client';

import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Download,
    Mail,
    Calendar,
    FileText,
    Eye,
    XCircle,
    UserCheck,
} from 'lucide-react';

import {
    Card,
    CardContent,
} from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { useJobApplicants } from '@/features/employer/hooks/useJobApplicants';

// Types based on your backend response
interface Applicant {
    id: string;
    fullName: string;
    email: string;
    skills: any[];
    resumes: Array<{
        url: string;
        fileName: string;
    }>;
    appliedAt: string;
    status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
}

interface ApplicantCardProps {
    applicant: Applicant;
    updateStatusMutation: ReturnType<typeof useJobApplicants>['updateStatusMutation'];
}


const ApplicantCard = ({ applicant, updateStatusMutation }: ApplicantCardProps) => {
    const handleDownloadResume = (resumeUrl: string, fileName: string) => {
        window.open(resumeUrl, '_blank');
    };

    const handleSendEmail = (email: string) => {
        window.open(`mailto:${email}`, '_blank');
    };


    const handleShortList = () => {
        updateStatusMutation.mutate(
            { applicationId: applicant.id, status: 'SHORTLISTED' },
            {
                onSuccess: () => alert(`${applicant.fullName} shortlisted!`),
                onError: (err) => console.error(err),
            }
        );
    }

    const handleRejected = () => {
        updateStatusMutation.mutate(
            { applicationId: applicant.id, status: 'REJECTED' },
            {
                onSuccess: () => alert(`${applicant.fullName} rejected!`),
                onError: (err) => console.error(err),
            }
        );
    }

    return (
        <Card className="hover:shadow-lg transition-all duration-300 border border-gray-200 rounded-xl overflow-hidden">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                    {/* Left Section - Applicant Info */}
                    <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {applicant.fullName.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold text-gray-900">{applicant.fullName}</h3>
                                <StatusBadge status={applicant.status} />
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="w-4 h-4" />
                                <span className="text-sm">{applicant.email}</span>
                            </div>

                            <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="w-4 h-4" />
                                <span className="text-sm">
                                    Applied on {format(new Date(applicant.appliedAt), 'MMM d, yyyy')}
                                </span>
                            </div>

                            {/* Skills */}
                            {applicant.skills && applicant.skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {applicant.skills.slice(0, 3).map((skill, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            {skill.name || skill}
                                        </Badge>
                                    ))}
                                    {applicant.skills.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{applicant.skills.length - 3} more
                                        </Badge>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Section - Actions */}
                    <div className="flex flex-col gap-3 min-w-[200px]">
                        {/* Resume Download */}
                        {applicant.resumes && applicant.resumes.length > 0 && (
                            <div className="space-y-2">
                                {applicant.resumes.map((resume, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDownloadResume(resume.url, resume.fileName)}
                                        className="w-full justify-start text-left"
                                    >
                                        <FileText className="w-4 h-4 mr-2" />
                                        <span className="truncate">{resume.fileName}</span>
                                        <Download className="w-4 h-4 ml-auto" />
                                    </Button>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        {/* <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendEmail(applicant.email)}
                                className="flex-1"
                            >
                                <Mail className="w-4 h-4 mr-1" />
                                Contact
                            </Button>
                            <Button
                                size="sm"
                                className="flex-1 bg-blue-600 hover:bg-blue-700"
                            >
                                <Eye className="w-4 h-4 mr-1" />
                                View Profile
                            </Button>
                        </div> */}

                        {/* Status Actions */}
                        {applicant.status === 'APPLIED' && (
                            <div className="flex gap-2">
                                <Button onClick={handleShortList} size="sm" variant="outline" className="flex-1 text-green-700 border-green-300 hover:bg-green-50">
                                    <UserCheck className="w-4 h-4 mr-1" />
                                    Shortlist
                                </Button>
                                <Button onClick={handleRejected} size="sm" variant="outline" className="flex-1 text-red-700 border-red-300 hover:bg-red-50">
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ApplicantCard