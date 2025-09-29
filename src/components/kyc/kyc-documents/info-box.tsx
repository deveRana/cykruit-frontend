"use client";

import React from "react";
import { Shield } from "lucide-react";

const InfoBox = () => {
  return (
    <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex">
        <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900 mb-1">Document Guidelines</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Upload clear, readable documents</li>
            <li>• Ensure all text and details are visible</li>
            <li>• Accepted: Business registration, GST, PAN, or government-issued docs</li>
            <li>• Verification typically takes 24–48 hours</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;