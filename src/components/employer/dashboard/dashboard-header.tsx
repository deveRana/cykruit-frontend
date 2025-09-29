'use client';

import React, { useState } from 'react';
import {
    Search, Plus, Bell, CheckCircle, ChevronDown, LayoutDashboard,
    User, Settings, LogOut, HelpCircle, Briefcase, Mail,
    Clock, AlertCircle, UserCheck, FileText
} from 'lucide-react';

const DashboardHeader = () => {
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const currentTime = new Date();

    // Mock notifications data
    const notifications = [
        {
            id: 1,
            type: 'application',
            title: 'New Application Received',
            message: 'John Doe applied for Senior Cybersecurity Analyst',
            time: '5 minutes ago',
            unread: true
        },
        {
            id: 2,
            type: 'interview',
            title: 'Interview Scheduled',
            message: 'Interview with Sarah Johnson confirmed for tomorrow',
            time: '1 hour ago',
            unread: true
        },
        {
            id: 3,
            type: 'message',
            title: 'New Message',
            message: 'Michael Brown sent you a message',
            time: '2 hours ago',
            unread: true
        },
        {
            id: 4,
            type: 'job',
            title: 'Job Posted Successfully',
            message: 'Your SOC Analyst position is now live',
            time: '1 day ago',
            unread: false
        },
        {
            id: 5,
            type: 'alert',
            title: 'Application Deadline Approaching',
            message: 'Cloud Security Engineer position closes in 3 days',
            time: '2 days ago',
            unread: false
        }
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'application':
                return <UserCheck className="w-5 h-5 text-blue-600" />;
            case 'interview':
                return <Clock className="w-5 h-5 text-green-600" />;
            case 'message':
                return <Mail className="w-5 h-5 text-purple-600" />;
            case 'job':
                return <Briefcase className="w-5 h-5 text-indigo-600" />;
            case 'alert':
                return <AlertCircle className="w-5 h-5 text-orange-600" />;
            default:
                return <Bell className="w-5 h-5 text-gray-600" />;
        }
    };

    const handlePostJob = () => {
        console.log('Navigate to post job');
        // router.push('/claude/employer/post-job');
    };

    const handleProfileClick = () => {
        console.log('Navigate to profile');
        setShowProfileMenu(false);
    };

    const handleSettingsClick = () => {
        console.log('Navigate to settings');
        setShowProfileMenu(false);
    };

    const handleLogout = () => {
        console.log('Logout user');
        setShowProfileMenu(false);
    };

    const handleNotificationClick = (notificationId) => {
        console.log('Notification clicked:', notificationId);
    };

    const handleMarkAllRead = () => {
        console.log('Mark all as read');
    };

    return (
        <div className="bg-white border-b border-gray-200 px-8 py-6">
            <div className="flex justify-between items-center">
                {/* Title + Date */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-md">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <span>Dashboard</span>
                    </h1>
                    <p className="text-gray-500 font-medium">
                        {currentTime.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center space-x-6">
                    {/* Post Job Button */}
                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 hover:bg-blue-700 shadow-sm"
                        onClick={handlePostJob}
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">Post Job</span>
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 relative"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <Bell className="w-6 h-6 text-gray-600" />
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowNotifications(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-20 max-h-96 overflow-hidden flex flex-col">
                                    {/* Header */}
                                    <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
                                            <p className="text-xs text-gray-600">{unreadCount} unread notifications</p>
                                        </div>
                                        <button
                                            onClick={handleMarkAllRead}
                                            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                        >
                                            Mark all read
                                        </button>
                                    </div>

                                    {/* Notifications List */}
                                    <div className="overflow-y-auto flex-1">
                                        {notifications.map((notification) => (
                                            <button
                                                key={notification.id}
                                                onClick={() => handleNotificationClick(notification.id)}
                                                className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 ${notification.unread ? 'bg-blue-50' : ''
                                                    }`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className="mt-1">
                                                        {getNotificationIcon(notification.type)}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                                {notification.title}
                                                            </p>
                                                            {notification.unread && (
                                                                <span className="w-2 h-2 bg-blue-600 rounded-full ml-2 flex-shrink-0"></span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {notification.time}
                                                        </p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                                        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
                                            View all notifications
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-4 bg-gray-50 rounded-lg p-2 pr-4 hover:bg-gray-100 transition-colors"
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
                                <span className="text-white text-sm font-bold">TC</span>
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-bold text-gray-900">TechCorp Inc.</p>
                                <p className="text-xs text-green-600 font-medium flex items-center">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Verified Employer
                                </p>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Profile Dropdown Menu */}
                        {showProfileMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowProfileMenu(false)}
                                />
                                <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20 overflow-hidden">
                                    {/* User Info */}
                                    <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
                                        <p className="text-sm font-bold text-gray-900">TechCorp Inc.</p>
                                        <p className="text-xs text-gray-600">employer@techcorp.com</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <button
                                            onClick={handleProfileClick}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                                        >
                                            <User className="w-4 h-4 text-gray-600" />
                                            <span>View Profile</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                console.log('Navigate to company profile');
                                                setShowProfileMenu(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                                        >
                                            <Briefcase className="w-4 h-4 text-gray-600" />
                                            <span>Company Profile</span>
                                        </button>

                                        <button
                                            onClick={handleSettingsClick}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                                        >
                                            <Settings className="w-4 h-4 text-gray-600" />
                                            <span>Settings</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                console.log('Navigate to help');
                                                setShowProfileMenu(false);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-3"
                                        >
                                            <HelpCircle className="w-4 h-4 text-gray-600" />
                                            <span>Help & Support</span>
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-gray-200 py-2">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;