'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: number;
    icon: React.ElementType;
    color?: 'blue' | 'green' | 'purple' | 'orange';
    subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    color = 'blue',
    subtitle,
}) => {
    const getColorStyles = (color: string) => {
        switch (color) {
            case 'green':
                return {
                    gradient:
                        'linear-gradient(to right, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))',
                    iconColor: '#22c55e',
                };
            case 'purple':
                return {
                    gradient:
                        'linear-gradient(to right, rgba(168, 85, 247, 0.1), rgba(168, 85, 247, 0.05))',
                    iconColor: '#a855f7',
                };
            case 'orange':
                return {
                    gradient:
                        'linear-gradient(to right, rgba(249, 115, 22, 0.1), rgba(249, 115, 22, 0.05))',
                    iconColor: '#f97316',
                };
            case 'blue':
            default:
                return {
                    gradient:
                        'linear-gradient(to right, rgba(0, 98, 255, 0.1), rgba(0, 98, 255, 0.05))',
                    iconColor: '#0062FF',
                };
        }
    };

    const colorStyles = getColorStyles(color);

    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center justify-between mb-6">
                <div
                    className="p-4 rounded-2xl shadow-lg"
                    style={{ background: colorStyles.gradient }}
                >
                    <Icon className="w-8 h-8" style={{ color: colorStyles.iconColor }} />
                </div>
                {change && (
                    <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1.5 rounded-xl font-semibold">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{change}%
                    </div>
                )}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
                <p className="text-gray-600 font-semibold">{title}</p>
                {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};

export default StatCard;