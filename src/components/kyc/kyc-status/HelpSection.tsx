'use client';
import React from 'react';
import { Mail, Phone } from 'lucide-react';

const HelpSection: React.FC = () => (
    <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                <Mail className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-500">support@cykruit.com</p>
                </div>
            </button>
            <button className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all">
                <Phone className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                    <p className="font-medium text-gray-900">Call Support</p>
                    <p className="text-sm text-gray-500">+91 1800-XXX-XXXX</p>
                </div>
            </button>
        </div>
    </div>
);

export default HelpSection;