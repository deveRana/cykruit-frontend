import { Shield } from "lucide-react";
import React from "react";

const KYCInfoBox = () => {
    return (
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex">
                <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-sm font-semibold text-blue-900 mb-1">
                        Why we need this information
                    </h3>
                    <p className="text-sm text-blue-800">
                        We verify all employers to maintain a trusted platform for
                        cybersecurity professionals. Your information is secure and will
                        only be used for verification purposes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KYCInfoBox;