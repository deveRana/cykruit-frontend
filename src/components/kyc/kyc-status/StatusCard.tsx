'use client';
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusCardProps {
    title: string;
    description: string;
    action: string;
    Icon: LucideIcon;
    color: string;
    bgColor: string;
    borderColor: string;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, description, action, Icon, color, bgColor, borderColor }) => {
    return (
        <div className={`${bgColor} ${borderColor} border rounded-xl p-6 mb-6`}>
            <div className="flex items-start space-x-4">
                <div className={`${bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <div className="flex-1">
                    <h2 className={`text-2xl font-bold ${color} mb-2`}>{title}</h2>
                    <p className="text-gray-700 mb-2">{description}</p>
                    <p className="text-sm text-gray-600">{action}</p>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;
