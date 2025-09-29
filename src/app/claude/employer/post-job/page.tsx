"use client"

import React, { useState, useEffect } from 'react';
import {
    Search, Plus, Building2, MapPin, Clock, Shield, Star, X, Save, Send,
    Briefcase, FileText, AlertCircle, CheckCircle
} from 'lucide-react';
import PostJobHeader from './PostJobHeader';

const ProfessionalPostJobForm = () => {
    // Form state
    const [formData, setFormData] = useState({
        jobTitle: '',
        role: '',
        workMode: '',
        location: '',
        jobType: '',
        duration: '',
        durationUnit: 'months',
        jobDescription: '',
        selectedCertifications: [],
        selectedSkills: []
    });

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
    };

    const addCertification = (cert) => {
        if (!formData.selectedCertifications.includes(cert)) {
            setFormData(prev => ({
                ...prev,
                selectedCertifications: [...prev.selectedCertifications, cert]
            }));
        }
        setCertificationSearch('');
        setShowCertificationSuggestions(false);
    };

    const removeCertification = (cert) => {
        setFormData(prev => ({
            ...prev,
            selectedCertifications: prev.selectedCertifications.filter(c => c !== cert)
        }));
    };

    const addSkill = (skill) => {
        if (!formData.selectedSkills.includes(skill)) {
            setFormData(prev => ({
                ...prev,
                selectedSkills: [...prev.selectedSkills, skill]
            }));
        }
        setSkillSearch('');
        setShowSkillSuggestions(false);
    };

    const removeSkill = (skill) => {
        setFormData(prev => ({
            ...prev,
            selectedSkills: prev.selectedSkills.filter(s => s !== skill)
        }));
    };

    const handleSaveDraft = () => {
        console.log('Saving as draft:', formData);
        alert('Job saved as draft!');
    };

    const handlePublishJob = () => {
        console.log('Publishing job:', formData);
        alert('Job published successfully!');
    };

    return (
        <>
            <PostJobHeader />
            <main className="p-8">
                <div className="space-y-6">
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
                                rows="8"
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
                                        placeholder="Search certifications (e.g., CISSP, CISM)..."
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
                                        placeholder="Search skills (e.g., Network Security, SIEM)..."
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
                        <div className="flex flex-col sm:flex-row gap-4 justify-end">
                            <button
                                type="button"
                                onClick={handleSaveDraft}
                                className="flex items-center justify-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save as Draft
                            </button>

                            <button
                                type="button"
                                onClick={handlePublishJob}
                                className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                            >
                                <Send className="w-4 h-4 mr-2" />
                                Publish Job
                            </button>
                        </div>

                        <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                            <div className="flex items-start">
                                <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                                <div className="text-sm text-blue-800">
                                    <p className="font-medium mb-1">Ready to publish?</p>
                                    <p>By publishing this job, you agree to our terms and conditions. Published jobs will be visible to qualified candidates immediately.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProfessionalPostJobForm;