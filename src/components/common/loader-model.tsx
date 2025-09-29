import React, { useState } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

// Loader Component
const Loader = ({ size = 'md', text = 'Loading...', fullScreen = false }) => {
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };

    const loaderContent = (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
                <div
                    className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-transparent animate-spin`}
                    style={{ borderTopColor: '#0062FF' }}
                />
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: '#0062FF' }}
                />
            </div>
            {text && (
                <p className="text-gray-600 font-medium text-sm animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                {loaderContent}
            </div>
        );
    }

    return loaderContent;
};

// Modal Component
const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    type = 'default',
    showCloseButton = true
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl'
    };

    const typeIcons = {
        default: null,
        success: <CheckCircle className="w-6 h-6 text-green-500" />,
        error: <AlertCircle className="w-6 h-6 text-red-500" />,
        warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
        info: <Info className="w-6 h-6" style={{ color: '#0062FF' }} />
    };

    return (
        <>
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                style={{ animation: 'fadeIn 0.2s ease-out' }}
                onClick={onClose}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className={`bg-white rounded-3xl shadow-2xl w-full ${sizeClasses[size]}`}
                    style={{ animation: 'slideUp 0.3s ease-out' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {(title || showCloseButton) && (
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                {typeIcons[type]}
                                {title && (
                                    <h3 className="text-xl font-bold text-gray-900">
                                        {title}
                                    </h3>
                                )}
                            </div>
                            {showCloseButton && (
                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}

                    <div className="p-6">
                        {children}
                    </div>

                    {footer && (
                        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

// Button Component
const Button = ({ children, onClick, variant = 'primary', disabled = false, loading = false }) => {
    const variantClasses = {
        primary: 'text-white shadow-lg hover:shadow-xl',
        secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        danger: 'bg-red-500 text-white shadow-lg hover:shadow-xl hover:bg-red-600'
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${variantClasses[variant]}`}
            style={variant === 'primary' ? { backgroundColor: '#0062FF' } : {}}
        >
            {loading && (
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            {children}
        </button>
    );
};

// Main Preview Component
export default function ModalLoaderPreview() {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">CykrUit Components</h1>
                    <p className="text-gray-600">Professional Modal & Loader components matching your theme</p>
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
                        <Button onClick={handleLoadingButton} variant="primary" loading={buttonLoading}>
                            Loading Button
                        </Button>
                    </div>
                </div>
            </div>

            {/* Full Screen Loader */}
            {showFullScreenLoader && (
                <Loader size="lg" text="Loading your data..." fullScreen={true} />
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