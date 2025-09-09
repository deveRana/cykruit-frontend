// src/components/micro-interactions/Loader.tsx
"use client";
import React from "react";

interface LoaderProps {
    size?: number;
    fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ size = 40, fullScreen = false }) => {
    return (
        <div
            className={`${fullScreen
                ? "fixed inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 z-50"
                : "inline-flex items-center justify-center"
                }`}
        >
            <div
                className="rounded-full animate-spin"
                style={{
                    width: size,
                    height: size,
                    borderWidth: size / 10, // dynamic border thickness
                    borderStyle: "solid",
                    borderColor: "var(--primary)",
                    borderTopColor: "#ffffff",
                    animation: "spinGradient 1s linear infinite",
                }}
            />
            <style jsx>{`
        @keyframes spinGradient {
          0% {
            transform: rotate(0deg);
            border-top-color: #3971ff;
          }
          25% {
            border-top-color: #8fb9ff;
          }
          50% {
            border-top-color: #ffffff;
          }
          75% {
            border-top-color: #8fb9ff;
          }
          100% {
            transform: rotate(360deg);
            border-top-color: #3971ff;
          }
        }
      `}</style>
        </div>
    );
};

export default Loader;
