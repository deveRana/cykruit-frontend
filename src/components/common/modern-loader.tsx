'use client';
import React from 'react';

type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
  size?: LoaderSize;
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
}) => {
  const sizeClasses: Record<LoaderSize, string> = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <div
          className={`${sizeClasses[size]} rounded-full border-4 border-gray-200 border-t-transparent animate-spin`}
          style={{ borderTopColor: '#0062FF' }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full animate-pulse"
          style={{ backgroundColor: '#0062FF' }}
        />
      </div>
      {text && (
        <p className="text-gray-600 font-medium text-sm animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export default Loader;