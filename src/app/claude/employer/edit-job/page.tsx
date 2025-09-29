"use client"

import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Building2, MapPin, Clock, Shield, Star, X, Save, Send,
    Briefcase, FileText, AlertCircle, CheckCircle, ArrowLeft, Trash2
} from 'lucide-react';
import EditJobHeader from './EditJobHeader';

const EditJobPage = () => {
    // Pre-filled job data (simulating existing job being edited)
    const existingJobData = {
        jobTitle: 'Senior Cybersecurity Analyst',
        role: 'Cybersecurity Analyst',
        workMode: 'Hybrid',
        location: 'New York, NY',
        jobType: 'Full-time',
        duration: '',
        durationUnit: 'months',
        jobDescription: `We are seeking an experienced Senior Cybersecurity Analyst to join our Security Operations Center. You'll be at the forefront of defending against cyber threats, working with cutting-edge security tools and collaborating with a world-class team.

Key Responsibilities:
• Monitor and analyze security events using advanced SIEM platforms
• Lead incident response efforts and coordinate with cross-functional teams
• Conduct comprehensive threat analysis and vulnerability assessments
• Develop and maintain security policies, procedures, and documentation
• Mentor junior analysts and contribute to team knowledge sharing

Requirements:
• Bachelor's degree in Computer Science, Information Security, or related field
• Minimum 5+ years of hands-on cybersecurity experience
• Strong experience with SIEM tools (Splunk, QRadar, or ArcSight)`,
        selectedCertifications: ['CISSP', 'CISM', 'CompTIA Security+'],
        selectedSkills: ['Network Security', 'SIEM', 'Incident Response', 'Vulnerability Assessment', 'Python', 'Splunk']
    };

    // Form state
    const [formData, setFormData] = useState(existingJobData);
    const [hasChanges, setHasChanges] = useState(false);

    // Suggestions state
    const [roleSuggestions, setRoleSuggestions] = useState([]);
    const [locationSuggestions, setLocationSuggestions] = useState([]);
    const [certificationSuggestions, setCertificationSuggestions] = useState([]);
    const [skillSuggestions, setSkillSuggestions] = useState([]);

    // Dropdown state
    const [showRoleSuggestions, setShowRoleSuggestions] = useState(false);
    const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
    const [showCertificationSuggestions, setShowCertificationSuggestions] = useState(false);
    const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);

    // Search state
    const [certificationSearch, setCertificationSearch] = useState('');
    const [skillSearch, setSkillSearch] = useState('');

    // Mock data
    const roles = [
        'Cybersecurity Analyst', 'Security Engineer', 'Penetration Tester', 'Security Architect',
        'SOC Analyst', 'Information Security Specialist', 'Cloud Security Engineer',
        'Network Security Engineer', 'Security Consultant', 'CISO', 'Security Auditor',
        'Incident Response Specialist', 'Vulnerability Assessment Analyst', 'Security Operations Manager',
        'Threat Intelligence Analyst', 'Compliance Officer', 'Risk Analyst', 'Forensics Analyst'
    ];

    const locations = [
        'New York, NY', 'San Francisco, CA', 'Los Angeles, CA', 'Chicago, IL', 'Austin, TX',
        'Seattle, WA', 'Boston, MA', 'Washington, DC', 'Atlanta, GA', 'Denver, CO',
        'Miami, FL', 'Phoenix, AZ', 'Dallas, TX', 'Philadelphia, PA', 'Detroit, MI',
        'Portland, OR', 'Las Vegas, NV', 'San Diego, CA', 'Tampa, FL', 'Nashville, TN'
    ];

    const certifications = [
        'CISSP', 'CISM', 'CISA', 'CompTIA Security+', 'CompTIA Network+', 'CompTIA CySA+',
        'CEH (Certified Ethical Hacker)', 'GCIH', 'GSEC', 'GIAC GPEN', 'OSCP', 'CISCP',
        'AWS Security Specialty', 'Azure Security Engineer', 'Google Cloud Security',
        'CISMP', 'ISO 27001 Lead Auditor', 'CRISC', 'CGRC', 'CCSP', 'PCIP', 'SSCP'
    ];

    const skills = [
        'Network Security', 'Vulnerability Assessment', 'Penetration Testing', 'Incident Response',
        'SIEM', 'Firewall Management', 'IDS/IPS', 'Malware Analysis', 'Digital Forensics',
        'Risk Assessment', 'Compliance', 'Cloud Security', 'Identity Management', 'Cryptography',
        'Threat Intelligence', 'Security Awareness', 'Python', 'PowerShell', 'Kali Linux',
        'Wireshark', 'Nessus', 'Metasploit', 'Burp Suite', 'Splunk', 'QRadar', 'ArcSight',
        'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Ansible'
    ];

    // Filter suggestions based on input
    useEffect(() => {
        if (formData.role) {
            const filtered = roles.filter(role =>
                role.toLowerCase().includes(formData.role.toLowerCase())
            );
            setRoleSuggestions(filtered.slice(0, 5));
        } else {
            setRoleSuggestions([]);
        }
    }, [formData.role]);

    useEffect(() => {
        if (formData.location) {
            const filtered = locations.filter(location =>
                location.toLowerCase().includes(formData.location.toLowerCase())
            );
            setLocationSuggestions(filtered.slice(0, 5));
        } else {
            setLocationSuggestions([]);
        }
    }, [formData.location]);

    useEffect(() => {
        if (certificationSearch) {
            const filtered = certifications.filter(cert =>
                cert.toLowerCase().includes(certificationSearch.toLowerCase()) &&
                !formData.selectedCertifications.includes(cert)
            );
            setCertificationSuggestions(filtered.slice(0, 5));
        } else {
            setCertificationSuggestions([]);
        }
    }, [certificationSearch, formData.selectedCertifications]);

    useEffect(() => {
        if (skillSearch) {
            const filtered = skills.filter(skill =>
                skill.toLowerCase().includes(skillSearch.toLowerCase()) &&
                !formData.selectedSkills.includes(skill)
            );
            setSkillSuggestions(filtered.slice(0, 5));
        } else {
            setSkillSuggestions([]);
        }
    }, [skillSearch, formData.selectedSkills]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setHasChanges(true);
    };

    const addCertification = (cert) => {
        if (!formData.selectedCertifications.includes(cert)) {
            setFormData(prev => ({
                ...prev,
                selectedCertifications: [...prev.selectedCertifications, cert]
            }));
            setHasChanges(true);
        }
        setCertificationSearch('');
        setShowCertificationSuggestions(false);
    };

    const removeCertification = (cert) => {
        setFormData(prev => ({
            ...prev,
            selectedCertifications: prev.selectedCertifications.filter(c => c !== cert)
        }));
        setHasChanges(true);
    };

    const addSkill = (skill) => {
        if (!formData.selectedSkills.includes(skill)) {
            setFormData(prev => ({
                ...prev,
                selectedSkills: [...prev.selectedSkills, skill]
            }));
            setHasChanges(true);
        }
        setSkillSearch('');
        setShowSkillSuggestions(false);
    };

    const removeSkill = (skill) => {
        setFormData(prev => ({
            ...prev,
            selectedSkills: prev.selectedSkills.filter(s => s !== skill)
        }));
        setHasChanges(true);
    };

    const handleSaveChanges = () => {
        console.log('Saving changes:', formData);
        alert('Job updated successfully!');
        setHasChanges(false);
    };

    const handleCancel = () => {
        if (hasChanges) {
            if (window.confirm('You have unsaved changes. Are you sure you want to cancel?')) {
                setFormData(existingJobData);
                setHasChanges(false);
            }
        } else {
            window.history.back();
        }
    };

    const handleDeleteJob = () => {
        if (window.confirm('Are you sure you want to delete this job? This action cannot be undone.')) {
            console.log('Deleting job');
            alert('Job deleted successfully!');
        }
    };

    return (
        <>
            <EditJobHeader />
            <main className="p-8 space-y-6">
                {/* Alert about editing */}
                <div className="bg-blue-50 rounded-lg shadow-sm border border-blue-200 p-4">
                    <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-blue-800">
                            <p className="font-medium mb-1">Editing Published Job</p>
                            <p>You are editing a live job posting. Changes will be reflected immediately after saving. Current applicants will not be affected.</p>
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <Briefcase className="w-5 h-5 text-gray-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Title *
                            </label>
                            <input
                                type="text"
                                value={formData.jobTitle}
                                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g. Senior Cybersecurity Analyst"
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role *
                            </label>
                            <input
                                type="text"
                                value={formData.role}
                                onChange={(e) => {
                                    handleInputChange('role', e.target.value);
                                    setShowRoleSuggestions(true);
                                }}
                                onFocus={() => setShowRoleSuggestions(true)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Start typing role..."
                                required
                            />
                            {showRoleSuggestions && roleSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                    {roleSuggestions.map((role, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => {
                                                handleInputChange('role', role);
                                                setShowRoleSuggestions(false);
                                            }}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Work Details */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <Building2 className="w-5 h-5 text-gray-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-900">Work Details</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Work Mode *
                            </label>
                            <select
                                value={formData.workMode}
                                onChange={(e) => handleInputChange('workMode', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select work mode</option>
                                <option value="Remote">Remote</option>
                                <option value="On-site">On-site</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>

                        {(formData.workMode === 'On-site' || formData.workMode === 'Hybrid') && (
                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location *
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => {
                                        handleInputChange('location', e.target.value);
                                        setShowLocationSuggestions(true);
                                    }}
                                    onFocus={() => setShowLocationSuggestions(true)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Search location..."
                                    required
                                />
                                {showLocationSuggestions && locationSuggestions.length > 0 && (
                                    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                        {locationSuggestions.map((location, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center text-sm"
                                                onClick={() => {
                                                    handleInputChange('location', location);
                                                    setShowLocationSuggestions(false);
                                                }}
                                            >
                                                <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                                                {location}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Employment Type */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <Clock className="w-5 h-5 text-gray-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-900">Employment Type</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Job Type *
                            </label>
                            <select
                                value={formData.jobType}
                                onChange={(e) => handleInputChange('jobType', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            >
                                <option value="">Select job type</option>
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>

                        {(['Contract', 'Part-time', 'Internship'].includes(formData.jobType)) && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration *
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={formData.duration}
                                        onChange={(e) => handleInputChange('duration', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter duration"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Duration Unit
                                    </label>
                                    <select
                                        value={formData.durationUnit}
                                        onChange={(e) => handleInputChange('durationUnit', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="weeks">Weeks</option>
                                        <option value="months">Months</option>
                                        <option value="years">Years</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Job Description */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center mb-4">
                        <FileText className="w-5 h-5 text-gray-600 mr-2" />
                        <h2 className="text-lg font-semibold text-gray-900">Job Description</h2>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description *
                        </label>
                        <textarea
                            value={formData.jobDescription}
                            onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                            rows="10"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            placeholder="Describe the role, responsibilities, requirements, and qualifications..."
                            required
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            Include role overview, key responsibilities, requirements, and benefits.
                        </p>
                    </div>
                </div>

                <div className="flex flex-row gap-6">
                    {/* Certifications */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <Shield className="w-5 h-5 text-gray-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Required Certifications</h2>
                        </div>

                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search and Add Certifications
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={certificationSearch}
                                    onChange={(e) => {
                                        setCertificationSearch(e.target.value);
                                        setShowCertificationSuggestions(true);
                                    }}
                                    onFocus={() => setShowCertificationSuggestions(true)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Search certifications..."
                                />
                            </div>
                            {showCertificationSuggestions && certificationSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                    {certificationSuggestions.map((cert, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => addCertification(cert)}
                                        >
                                            {cert}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {formData.selectedCertifications.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selected Certifications ({formData.selectedCertifications.length})
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.selectedCertifications.map((cert, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm"
                                        >
                                            {cert}
                                            <button
                                                type="button"
                                                onClick={() => removeCertification(cert)}
                                                className="ml-2 text-blue-600 hover:text-blue-800"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Skills */}
                    <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center mb-4">
                            <Star className="w-5 h-5 text-gray-600 mr-2" />
                            <h2 className="text-lg font-semibold text-gray-900">Required Skills</h2>
                        </div>

                        <div className="relative mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search and Add Skills
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={skillSearch}
                                    onChange={(e) => {
                                        setSkillSearch(e.target.value);
                                        setShowSkillSuggestions(true);
                                    }}
                                    onFocus={() => setShowSkillSuggestions(true)}
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Search skills..."
                                />
                            </div>
                            {showSkillSuggestions && skillSuggestions.length > 0 && (
                                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 shadow-lg max-h-60 overflow-y-auto">
                                    {skillSuggestions.map((skill, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            className="w-full px-3 py-2 text-left hover:bg-gray-50 text-sm"
                                            onClick={() => addSkill(skill)}
                                        >
                                            {skill}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {formData.selectedSkills.length > 0 && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Selected Skills ({formData.selectedSkills.length})
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {formData.selectedSkills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm"
                                        >
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => removeSkill(skill)}
                                                className="ml-2 text-green-600 hover:text-green-800"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between">
                        <button
                            type="button"
                            onClick={handleDeleteJob}
                            className="flex items-center justify-center px-6 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                        >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Job
                        </button>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSaveChanges}
                                disabled={!hasChanges}
                                className={`flex items-center justify-center px-6 py-2 rounded-md transition-colors ${hasChanges
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </main>

        </>
    );
};

export default EditJobPage;