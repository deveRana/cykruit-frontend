'use client';

import React from 'react';
import Button from '@/components/common/button-spinner';
import { useMessageModal } from '@/components/common/MessageModal';

const DemoButtons: React.FC = () => {
    const { showMessage, hideMessage } = useMessageModal();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-gray-50 p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Message Modal Demo</h1>

            <Button
                onClick={() =>
                    showMessage({
                        type: 'success',
                        title: 'Job Posted Successfully!',
                        content: 'Your job posting has been published and is now live. Candidates can start applying!',
                        size: 'sm',
                    })
                }
                variant="primary"
            >
                Show Success
            </Button>

            <Button
                onClick={() =>
                    showMessage({
                        type: 'error',
                        title: 'Error',
                        content: { error: 'Something went wrong.', statusCode: 500 },
                        size: 'md',
                        footer: (
                            <Button onClick={hideMessage} variant="danger">
                                Close
                            </Button>
                        ),
                    })
                }
                variant="danger"
            >
                Show Error
            </Button>

            <Button
                onClick={() =>
                    showMessage({
                        type: 'warning',
                        title: 'Warning',
                        content: { message: ['Your account is almost out of storage.'] },
                        size: 'md',
                    })
                }
                variant="secondary"
            >
                Show Warning
            </Button>

            <Button
                onClick={() =>
                    showMessage({
                        type: 'info',
                        title: 'Info',
                        content: 'This is an informational message.',
                        size: 'md',
                    })
                }
            >
                Show Info
            </Button>
        </div>
    );
};

export default function Page() {
    return <DemoButtons />;
}
