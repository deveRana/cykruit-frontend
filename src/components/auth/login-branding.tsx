'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, User, Shield } from 'lucide-react';

interface LoginBrandingProps {
  title: string;
  description: string;
  features: string[];
  stats: { number: string; label: string }[];
  backgroundColor?: string;
}

export const LoginBranding: React.FC<LoginBrandingProps> = ({
  title,
  description,
  features,
  stats,
  backgroundColor = '#0062FF',
}) => {
  return (
    <div
      className="hidden lg:flex lg:w-1/2 p-12 xl:p-16 flex-col justify-center relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white opacity-5 rounded-full -ml-48 -mb-48"></div>

      <div className="relative z-10">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7" style={{ color: backgroundColor }} />
          </div>
          <span className="text-2xl font-bold text-white">Cykruit</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">{title}</h1>
        <p className="text-blue-100 text-lg mb-10">{description}</p>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className="text-white text-base">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats */}
      <div className="grid grid-cols-3 gap-6 mt-12 relative z-10">
        {stats.map((stat, index) => (
          <div key={index}>
            <div className="text-3xl font-bold text-white">{stat.number}</div>
            <div className="text-blue-100 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};