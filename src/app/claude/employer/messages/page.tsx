"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
    Search, Send, Paperclip, MoreHorizontal, Phone, Video, Star,
    Calendar, User, MessageCircle, Clock, Check, CheckCheck,
    Filter, Archive, Trash2, Flag, Settings, ChevronDown,
    Briefcase, MapPin, Mail, FileText, X, Plus
} from 'lucide-react';

const EmployerMessages = () => {
    const [selectedConversation, setSelectedConversation] = useState(1);
    const [messageText, setMessageText] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const messagesEndRef = useRef(null);

    // Mock conversations data
    const conversations = [
        {
            id: 1,
            applicantName: 'Sarah Johnson',
            jobTitle: 'Senior Cybersecurity Analyst',
            jobId: 1,
            lastMessage: 'Thank you for considering my application. I look forward to hearing from you.',
            lastMessageTime: '2024-01-25T10:30:00',
            unreadCount: 2,
            status: 'active',
            applicantEmail: 'sarah.johnson@email.com',
            applicantPhone: '+1 (555) 123-4567',
            rating: 4.8,
            avatar: 'SJ',
            online: true,
            applicationStatus: 'under_review'
        },
        {
            id: 2,
            applicantName: 'Michael Chen',
            jobTitle: 'SOC Engineer L2',
            jobId: 2,
            lastMessage: 'I have availability for an interview next week.',
            lastMessageTime: '2024-01-24T15:45:00',
            unreadCount: 0,
            status: 'active',
            applicantEmail: 'michael.chen@email.com',
            applicantPhone: '+1 (555) 234-5678',
            rating: 4.5,
            avatar: 'MC',
            online: false,
            applicationStatus: 'shortlisted'
        },
        {
            id: 3,
            applicantName: 'Emily Rodriguez',
            jobTitle: 'Penetration Tester',
            jobId: 3,
            lastMessage: 'Here is my portfolio link as requested.',
            lastMessageTime: '2024-01-24T09:20:00',
            unreadCount: 1,
            status: 'active',
            applicantEmail: 'emily.rodriguez@email.com',
            applicantPhone: '+1 (555) 345-6789',
            rating: 4.9,
            avatar: 'ER',
            online: true,
            applicationStatus: 'interview_scheduled'
        },
        {
            id: 4,
            applicantName: 'David Wilson',
            jobTitle: 'Cloud Security Architect',
            jobId: 4,
            lastMessage: 'Thank you for the interview opportunity.',
            lastMessageTime: '2024-01-23T14:15:00',
            unreadCount: 0,
            status: 'archived',
            applicantEmail: 'david.wilson@email.com',
            applicantPhone: '+1 (555) 456-7890',
            rating: 4.7,
            avatar: 'DW',
            online: false,
            applicationStatus: 'hired'
        }
    ];

    // Mock messages data
    const messages = {
        1: [
            {
                id: 1,
                senderId: 'applicant',
                senderName: 'Sarah Johnson',
                content: 'Hello! Thank you for considering my application for the Senior Cybersecurity Analyst position. I am very excited about this opportunity.',
                timestamp: '2024-01-24T09:00:00',
                read: true,
                type: 'text'
            },
            {
                id: 2,
                senderId: 'employer',
                senderName: 'TechCorp HR',
                content: 'Hi Sarah, thank you for your interest in our position. We have reviewed your application and are impressed with your background. Could you please provide more details about your experience with SIEM tools?',
                timestamp: '2024-01-24T10:30:00',
                read: true,
                type: 'text'
            },
            {
                id: 3,
                senderId: 'applicant',
                senderName: 'Sarah Johnson',
                content: 'Absolutely! I have over 5 years of experience working with various SIEM platforms including Splunk, QRadar, and ArcSight. In my current role, I manage security event correlation and incident response workflows.',
                timestamp: '2024-01-24T11:15:00',
                read: true,
                type: 'text'
            },
            {
                id: 4,
                senderId: 'applicant',
                senderName: 'Sarah Johnson',
                content: 'I have also implemented custom dashboards and automated threat detection rules that reduced false positives by 40%.',
                timestamp: '2024-01-24T11:16:00',
                read: true,
                type: 'text'
            },
            {
                id: 5,
                senderId: 'employer',
                senderName: 'TechCorp HR',
                content: 'That\'s excellent experience! We would like to schedule an initial phone screening. Are you available this week?',
                timestamp: '2024-01-25T09:00:00',
                read: true,
                type: 'text'
            },
            {
                id: 6,
                senderId: 'applicant',
                senderName: 'Sarah Johnson',
                content: 'Thank you for considering my application. I look forward to hearing from you.',
                timestamp: '2024-01-25T10:30:00',
                read: false,
                type: 'text'
            }
        ],
        2: [
            {
                id: 1,
                senderId: 'applicant',
                senderName: 'Michael Chen',
                content: 'Hi, I submitted my application for the SOC Engineer L2 position and wanted to follow up.',
                timestamp: '2024-01-23T14:00:00',
                read: true,
                type: 'text'
            },
            {
                id: 2,
                senderId: 'employer',
                senderName: 'TechCorp HR',
                content: 'Hello Michael, we have received your application and will review it shortly. Thank you for your patience.',
                timestamp: '2024-01-23T16:30:00',
                read: true,
                type: 'text'
            },
            {
                id: 3,
                senderId: 'applicant',
                senderName: 'Michael Chen',
                content: 'I have availability for an interview next week.',
                timestamp: '2024-01-24T15:45:00',
                read: true,
                type: 'text'
            }
        ]
    };

    const currentConversation = conversations.find(conv => conv.id === selectedConversation);
    const currentMessages = messages[selectedConversation] || [];

    const filteredConversations = conversations.filter(conv => {
        const matchesSearch = conv.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            conv.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'all' || conv.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentMessages]);

    const handleSendMessage = () => {
        if (messageText.trim()) {
            console.log('Sending message:', messageText);
            setMessageText('');
            // Here you would typically add the message to the messages array
        }
    };

    const formatMessageTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 24) {
            return date.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'under_review':
                return 'bg-yellow-100 text-yellow-800';
            case 'shortlisted':
                return 'bg-purple-100 text-purple-800';
            case 'interview_scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'hired':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center space-x-2 text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all duration-200"
                                onClick={() => window.history.back()}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                <span className="font-medium">Back</span>
                            </button>

                            <div>
                                <h1 className="text-2xl font-bold text-white flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                        <MessageCircle className="w-5 h-5 text-white" />
                                    </div>
                                    <span>Messages</span>
                                </h1>
                                <p className="text-gray-300 text-sm mt-1">Communicate with job applicants and manage conversations</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-xl font-bold text-white">
                                    {conversations.reduce((sum, conv) => sum + conv.unreadCount, 0)}
                                </div>
                                <div className="text-gray-400 text-xs">Unread</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden" style={{ height: '700px' }}>
                    <div className="flex h-full">
                        {/* Conversations Sidebar */}
                        <div className="w-1/3 border-r border-gray-200 flex flex-col">
                            {/* Search and Filter */}
                            <div className="p-4 border-b border-gray-200">
                                <div className="relative mb-4">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search conversations..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    />
                                </div>

                                <div className="flex space-x-2">
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                    >
                                        <option value="all">All Conversations</option>
                                        <option value="active">Active</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                            </div>

                            {/* Conversations List */}
                            <div className="flex-1 overflow-y-auto">
                                {filteredConversations.map(conversation => (
                                    <div
                                        key={conversation.id}
                                        onClick={() => setSelectedConversation(conversation.id)}
                                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${selectedConversation === conversation.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
                                            }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <span className="text-white font-bold text-sm">
                                                        {conversation.avatar}
                                                    </span>
                                                </div>
                                                {conversation.online && (
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-1">
                                                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                                                        {conversation.applicantName}
                                                    </h3>
                                                    {conversation.unreadCount > 0 && (
                                                        <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                                                            {conversation.unreadCount}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(conversation.applicationStatus)}`}>
                                                        {conversation.applicationStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                    </span>
                                                    <div className="flex items-center">
                                                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                                        <span className="text-xs text-gray-600 ml-1">{conversation.rating}</span>
                                                    </div>
                                                </div>

                                                <p className="text-gray-600 text-xs mb-1 truncate">
                                                    {conversation.jobTitle}
                                                </p>

                                                <p className="text-gray-500 text-xs truncate mb-1">
                                                    {conversation.lastMessage}
                                                </p>

                                                <p className="text-gray-400 text-xs">
                                                    {formatMessageTime(conversation.lastMessageTime)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Message Area */}
                        <div className="flex-1 flex flex-col">
                            {currentConversation ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-gray-200 bg-gray-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <span className="text-white font-bold text-sm">
                                                            {currentConversation.avatar}
                                                        </span>
                                                    </div>
                                                    {currentConversation.online && (
                                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">
                                                        {currentConversation.applicantName}
                                                    </h3>
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <span className="flex items-center">
                                                            <Briefcase className="w-3 h-3 mr-1" />
                                                            {currentConversation.jobTitle}
                                                        </span>
                                                        <span className="flex items-center">
                                                            <Mail className="w-3 h-3 mr-1" />
                                                            {currentConversation.applicantEmail}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <Phone className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <Video className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <Calendar className="w-4 h-4 text-gray-600" />
                                                </button>
                                                <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                                    <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                        {currentMessages.map(message => (
                                            <div
                                                key={message.id}
                                                className={`flex ${message.senderId === 'employer' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.senderId === 'employer'
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-gray-200 text-gray-900'
                                                        }`}
                                                >
                                                    <p className="text-sm">{message.content}</p>
                                                    <div className={`flex items-center justify-end space-x-1 mt-1 ${message.senderId === 'employer' ? 'text-blue-200' : 'text-gray-500'
                                                        }`}>
                                                        <span className="text-xs">
                                                            {formatMessageTime(message.timestamp)}
                                                        </span>
                                                        {message.senderId === 'employer' && (
                                                            message.read ? (
                                                                <CheckCheck className="w-3 h-3" />
                                                            ) : (
                                                                <Check className="w-3 h-3" />
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input */}
                                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                                        <div className="flex items-center space-x-2">
                                            <button className="p-2 text-gray-600 hover:text-gray-800 transition-colors">
                                                <Paperclip className="w-5 h-5" />
                                            </button>
                                            <div className="flex-1 relative">
                                                <input
                                                    type="text"
                                                    placeholder="Type your message..."
                                                    value={messageText}
                                                    onChange={(e) => setMessageText(e.target.value)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <button
                                                onClick={handleSendMessage}
                                                disabled={!messageText.trim()}
                                                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <div className="text-center">
                                        <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                                        <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployerMessages;