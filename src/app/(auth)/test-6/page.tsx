'use client';
import Button from '@/components/common/button-spinner';
import Loader from '@/components/common/modern-loader';
import Modal from '@/components/common/modern-modal';
import React, { useState } from 'react';

export default function Page() {
    const [showDefaultModal, setShowDefaultModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [showFullScreenLoader, setShowFullScreenLoader] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const handleLoadingButton = () => {
        setButtonLoading(true);
        setTimeout(() => setButtonLoading(false), 2000);
    };

    const handleFullScreenLoader = () => {
        setShowFullScreenLoader(true);
        setTimeout(() => setShowFullScreenLoader(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">UI Components Demo</h1>
                    <p className="text-gray-600">
                        Examples of <strong>Loader</strong>, <strong>Modal</strong>, and <strong>Button</strong> components
                    </p>
                </div>

                {/* Loaders Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Loaders</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 mb-4">Small</p>
                            <Loader size="sm" text="Loading..." />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 mb-4">Medium</p>
                            <Loader size="md" text="Processing..." />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-semibold text-gray-700 mb-4">Large</p>
                            <Loader size="lg" text="Please wait..." />
                        </div>
                    </div>
                    <div className="mt-8 text-center">
                        <Button onClick={handleFullScreenLoader} variant="primary">
                            Show Full Screen Loader
                        </Button>
                    </div>
                </div>

                {/* Modals Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Modals</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Button onClick={() => setShowDefaultModal(true)} variant="primary">
                            Default Modal
                        </Button>
                        <Button onClick={() => setShowSuccessModal(true)} variant="primary">
                            Success Modal
                        </Button>
                        <Button onClick={() => setShowErrorModal(true)} variant="primary">
                            Error Modal
                        </Button>
                        <Button onClick={() => setShowWarningModal(true)} variant="primary">
                            Warning Modal
                        </Button>
                        <Button onClick={() => setShowInfoModal(true)} variant="primary">
                            Info Modal
                        </Button>
                        <Button
                            onClick={handleLoadingButton}
                            variant="primary"
                            loading={buttonLoading}
                        >
                            Loading Button
                        </Button>
                    </div>
                </div>
            </div>

            {/* Full Screen Loader */}
            {showFullScreenLoader && (
                <Loader size="lg" text="Loading your data..." fullScreen />
            )}

            {/* Default Modal */}
            <Modal
                isOpen={showDefaultModal}
                onClose={() => setShowDefaultModal(false)}
                title="Create New Job Posting"
                size="md"
                footer={
                    <>
                        <Button onClick={() => setShowDefaultModal(false)} variant="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => setShowDefaultModal(false)} variant="primary">
                            Create Job
                        </Button>
                    </>
                }
            >
                <p className="text-gray-600 mb-4">
                    Fill in the details to create a new job posting for your company.
                </p>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Job Title"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        placeholder="Job Description"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </Modal>

            {/* Success Modal */}
            <Modal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Job Posted Successfully!"
                type="success"
                size="sm"
                footer={
                    <Button onClick={() => setShowSuccessModal(false)} variant="primary">
                        Got it
                    </Button>
                }
            >
                <p className="text-gray-600">
                    Your job posting has been published and is now live. Candidates can start applying!
                </p>
            </Modal>

            {/* Error Modal */}
            <Modal
                isOpen={showErrorModal}
                onClose={() => setShowErrorModal(false)}
                title="Error Occurred"
                type="error"
                size="sm"
                footer={
                    <Button onClick={() => setShowErrorModal(false)} variant="danger">
                        Close
                    </Button>
                }
            >
                <p className="text-gray-600">
                    Something went wrong while processing your request. Please try again later.
                </p>
            </Modal>

            {/* Warning Modal */}
            <Modal
                isOpen={showWarningModal}
                onClose={() => setShowWarningModal(false)}
                title="Delete Job Posting?"
                type="warning"
                size="sm"
                footer={
                    <>
                        <Button onClick={() => setShowWarningModal(false)} variant="secondary">
                            Cancel
                        </Button>
                        <Button onClick={() => setShowWarningModal(false)} variant="danger">
                            Delete
                        </Button>
                    </>
                }
            >
                <p className="text-gray-600">
                    Are you sure you want to delete this job posting? This action cannot be undone.
                </p>
            </Modal>

            {/* Info Modal */}
            <Modal
                isOpen={showInfoModal}
                onClose={() => setShowInfoModal(false)}
                title="Application Guidelines"
                type="info"
                size="md"
                footer={
                    <Button onClick={() => setShowInfoModal(false)} variant="primary">
                        Understood
                    </Button>
                }
            >
                <div className="space-y-3 text-gray-600">
                    <p>Please ensure your job posting includes:</p>
                    <ul className="list-disc list-inside space-y-2 ml-2">
                        <li>Clear job title and description</li>
                        <li>Required qualifications and skills</li>
                        <li>Salary range (if applicable)</li>
                        <li>Work location and type</li>
                    </ul>
                </div>
            </Modal>
        </div>
    );
}
