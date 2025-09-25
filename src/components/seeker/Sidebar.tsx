"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { seekerNavLinks } from "@/lib/constants/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMessageModal } from "@/components/common/MessageModal";

export default function SeekerSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const messageModal = useMessageModal();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => {
                // messageModal.showMessage("success", "Logged out successfully!");
            },
            onError: () => {
                messageModal.showMessage("error", "Failed to logout. Try again.");
            },
        });
    };

    return (
        <aside className="w-64 h-screen bg-[#0F123F] flex flex-col shadow-2xl transition-all duration-300 rounded-tr-2xl rounded-br-2xl py-6 px-3">
            {/* Logo */}
            <Link href="/" target="_blank" >
                <div className="h-24 flex items-center justify-center mb-6 border-b border-indigo-900/20">
                    <Image src="/assets/logo.svg" alt="Logo" width={70} height={45} />
                </div></Link>

            {/* Nav Links */}
            <nav className="flex-1 space-y-3 px-2">
                {seekerNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl relative transition-all duration-300
                ${isActive
                                    ? "bg-[#F1F5F9] text-[#0F123F] font-semibold shadow-lg scale-105 hover:shadow-2xl"
                                    : "text-gray-300 hover:bg-indigo-500/20 hover:text-white"
                                }`}
                        >
                            <Icon
                                className={`w-6 h-6 transition-transform duration-200 ${isActive
                                    ? "scale-110 text-[#0F123F]"
                                    : "group-hover:scale-110"
                                    }`}
                            />
                            <span
                                className={`text-base transition-all duration-200 ${isActive ? "scale-105" : ""
                                    }`}
                            >
                                {link.name}
                            </span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="mt-6 px-2">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 group"
                >
                    <LogOut className="w-6 h-6 transition-transform duration-200 group-hover:rotate-12" />
                    <span className="text-base">Logout</span>
                </button>
            </div>
        </aside>
    );
}
