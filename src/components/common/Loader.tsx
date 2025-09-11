"use client";
import React from "react";

interface LoaderProps {
  size?: number;
  mini?: boolean; // new prop
}

const Loader: React.FC<LoaderProps> = ({ size = 40, mini = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${mini
          ? "inline-block" // small inline loader
          : "w-[100vw] h-[100vh] bg-white/50 fixed top-0 left-0 z-50"
        }`}
    >
      <div
        className="rounded-full animate-spin"
        style={{
          width: size,
          height: size,
          borderWidth: size / 10,
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
