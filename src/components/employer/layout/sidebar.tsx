'use client';

import React from 'react';
import Link from 'next/link';
import {
    Shield,
    Home,
    Briefcase,
    Settings,
    LogOut,
    ChevronRight,
    Menu,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMessageModal } from "@/components/common/MessageModal";
interface SidebarProps {
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarCollapsed, setSidebarCollapsed }) => {

    const pathname = usePathname();
    const { logout } = useAuth();
    const messageModal = useMessageModal();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => messageModal.showMessage("success", "Logged out successfully!"),
            onError: () => messageModal.showMessage("error", "Failed to logout. Try again."),
        });
    };

    const navItems = [
        { href: '/claude/employer/dashboard', label: 'Dashboard', icon: Home },
        { href: '/claude/employer/jobs', label: 'Job Postings', icon: Briefcase },
        // { href: '/claude/employer/applicants', label: 'Applicants', icon: Users },
        // { href: '/claude/employer/interviews', label: 'Interviews', icon: Calendar },
        // { href: '/claude/employer/messages', label: 'Messages', icon: MessageCircle, badge: 3 },
        // { href: '/claude/employer/analytics', label: 'Analytics', icon: TrendingUp },
    ];

    return (
        <div
            className={`bg-white shadow-xl h-full ${sidebarCollapsed ? 'w-22' : 'w-72'
                } fixed left-0 top-0 z-30 border-r border-gray-100 transition-all duration-300 ease-in-out`}
        >
            {/* Logo */}
            <div className="p-6 border-b border-gray-100 flex items-center">
                <div className="flex items-center space-x-3 overflow-hidden">
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0"
                        style={{ backgroundColor: '#0062FF' }}
                    >
                        <Shield className="w-7 h-7 text-white" />
                    </div>
                    <div
                        className={`transition-all duration-300 ${sidebarCollapsed
                            ? 'opacity-0 w-0 overflow-hidden'
                            : 'opacity-100 w-auto'
                            }`}
                    >
                        <h2 className="font-bold text-gray-900 text-xl tracking-tight whitespace-nowrap">
                            CykrUit
                        </h2>
                        <p className="text-sm text-gray-500 font-medium whitespace-nowrap">
                            Employer Portal
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="mt-8 px-4">
                <div className="space-y-3">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        // Active logic
                        const isDashboard = item.label === 'Dashboard';
                        const isActive = isDashboard
                            ? pathname === '/claude/employer' || pathname.startsWith(item.href)
                            : pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group w-full flex items-center px-4 py-3.5 rounded-2xl text-left transition-all duration-200 relative ${isActive
                                    ? 'shadow-sm border'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                style={
                                    isActive
                                        ? {
                                            backgroundColor: 'rgba(0, 98, 255, 0.1)',
                                            borderColor: 'rgba(0, 98, 255, 0.2)',
                                            color: '#0062FF',
                                        }
                                        : {}
                                }
                            >
                                <Icon
                                    className={`w-6 h-6 transition-colors flex-shrink-0 ${isActive ? '' : 'text-gray-400 group-hover:text-gray-600'
                                        }`}
                                    style={isActive ? { color: '#0062FF' } : {}}
                                />
                                <div
                                    className={`flex items-center justify-between flex-1 ml-4 transition-all duration-300 ${sidebarCollapsed
                                        ? 'opacity-0 w-0 overflow-hidden ml-0'
                                        : 'opacity-100 w-auto'
                                        }`}
                                >
                                    <span className="font-semibold text-sm whitespace-nowrap">
                                        {item.label}
                                    </span>
                                </div>
                                {isActive && (
                                    <div
                                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 rounded-r-full"
                                        style={{ backgroundColor: '#0062FF' }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom Section */}
            <div className="absolute bottom-6 left-4 right-4 space-y-3">
                <Link
                    href="/claude/employer/settings"
                    className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                >
                    <Settings className="w-6 h-6 flex-shrink-0" />
                    <span
                        className={`font-semibold text-sm ml-4 transition-all duration-300 whitespace-nowrap ${sidebarCollapsed
                            ? 'opacity-0 w-0 overflow-hidden ml-0'
                            : 'opacity-100 w-auto'
                            }`}
                    >
                        Settings
                    </span>
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-2xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200">
                    <LogOut className="w-6 h-6 flex-shrink-0" />
                    <span
                        className={`font-semibold text-sm ml-4 transition-all duration-300 whitespace-nowrap ${sidebarCollapsed
                            ? 'opacity-0 w-0 overflow-hidden ml-0'
                            : 'opacity-100 w-auto'
                            }`}
                    >
                        Sign Out
                    </span>
                </button>
            </div>

            {/* Collapse Button */}
            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="absolute -right-3 top-8 w-6 h-6 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
            >
                {sidebarCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                ) : (
                    <Menu className="w-4 h-4 text-gray-600" />
                )}
            </button>
        </div>
    );
};

export default Sidebar;