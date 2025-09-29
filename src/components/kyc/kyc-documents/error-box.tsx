"use client";

import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorBox = ({ message }: { message: string }) => {
    return (
        <div className="mt-4 flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
            <p className="text-sm text-red-800">{message}</p>
        </div>
    );
};

export default ErrorBox;