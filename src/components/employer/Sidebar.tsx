"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { employerNavLinks } from "@/lib/constants/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useMessageModal } from "@/components/common/MessageModal";

interface Props {
    collapsed?: boolean;
}

export default function EmployerSidebar({ collapsed = false }: Props) {
    const pathname = usePathname();
    const { logout } = useAuth();
    const messageModal = useMessageModal();

    const handleLogout = () => {
        logout.mutate(undefined, {
            onSuccess: () => messageModal.showMessage("success", "Logged out successfully!"),
            onError: () => messageModal.showMessage("error", "Failed to logout. Try again."),
        });
    };

    return (
        <aside
            className={`h-full bg-[#0F123F] flex flex-col shadow-2xl transition-all duration-300 py-6 px-4 rounded-tr-2xl rounded-br-2xl ${collapsed ? "w-20" : "w-64"
                }`}
        >
            {/* Logo */}
            <div
                className="flex items-center justify-center mb-6 border-b border-indigo-900/20"
                style={{ width: "100%", height: 60, minHeight: 60 }}
            >
                <Link href="/" target="_blank">
                    <div style={{ width: 60, height: 60, position: "relative" }}>
                        <Image
                            src="/assets/logo.svg"
                            alt="Logo"
                            fill
                            style={{ objectFit: "contain" }}
                        />
                    </div>
                </Link>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 flex flex-col gap-2">
                {employerNavLinks.map((link) => {
                    const isActive = pathname === link.href;
                    const Icon = link.icon;
                    return (
                      <Link
  key={link.href}
  href={link.href}
  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
    isActive
      ? "bg-indigo-100 text-[#0F123F] font-semibold shadow-lg scale-105 hover:shadow-2xl"
      : "text-gray-300 hover:bg-indigo-500/30 hover:text-white"
  }`}
>
  <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? "scale-110 text-[#0F123F]" : ""}`} />
  
  {/* Text always present but animated */}
  <span
    className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
      collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
    }`}
  >
    {link.name}
  </span>
</Link>

                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="mt-6">
                <button
                    onClick={handleLogout}
                    className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200`}
                >
                    <LogOut className="w-6 h-6 flex-shrink-0" />
                    {!collapsed && <span className="text-base">Logout</span>}
                </button>
            </div>
        </aside>
    );
}
