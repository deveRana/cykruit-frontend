'use client';

import React, { useState } from 'react';

interface SimpleTooltipProps {
    children: React.ReactNode;
    text: string;
    show?: boolean;
    side?: 'top' | 'right' | 'bottom' | 'left';
}

const SimpleTooltip: React.FC<SimpleTooltipProps> = ({
    children,
    text,
    show = true,
    side = 'right'
}) => {
    const [isVisible, setIsVisible] = useState(false);

    if (!show) return <>{children}</>;

    const getPositionClasses = () => {
        switch (side) {
            case 'top':
                return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
            case 'bottom':
                return 'top-full left-1/2 -translate-x-1/2 mt-2';
            case 'left':
                return 'right-full top-1/2 -translate-y-1/2 mr-2';
            case 'right':
            default:
                return 'left-full top-1/2 -translate-y-1/2 ml-2';
        }
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={`absolute z-50 pointer-events-none ${getPositionClasses()}`}>
                    <div className="bg-gray-900 text-white text-sm font-medium px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
                        {text}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimpleTooltip;