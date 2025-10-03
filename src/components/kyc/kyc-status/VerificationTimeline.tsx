'use client';
import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';

interface TimelineItem {
    label: string;
    date: string;
    completed: boolean;
}

interface VerificationTimelineProps {
    timeline: TimelineItem[];
}

// 👇 safe date formatting with IST timezone
const formatDate = (isoString?: string) => {
    if (!isoString) return '-';
    const date = new Date(isoString);

    if (isNaN(date.getTime())) return '-'; // catch invalid date

    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11 ? 'st' :
            day % 10 === 2 && day !== 12 ? 'nd' :
                day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'Asia/Kolkata' });
    const year = date.toLocaleString('en-US', { year: 'numeric', timeZone: 'Asia/Kolkata' });

    const time = date.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return `${day}${suffix} ${month} ${year} ${time}`;
};

const VerificationTimeline: React.FC<VerificationTimelineProps> = ({ timeline }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Verification Timeline</h3>
        <div className="space-y-6">
            {timeline.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.completed
                                ? 'bg-blue-100 text-blue-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                    >
                        {item.completed ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <Clock className="w-5 h-5" />
                        )}
                    </div>
                    <div className="flex-1">
                        <p
                            className={`font-medium ${item.completed ? 'text-gray-900' : 'text-gray-500'
                                }`}
                        >
                            {item.label}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            {formatDate(item.date)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default VerificationTimeline;