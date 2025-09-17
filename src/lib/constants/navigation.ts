import { LayoutDashboard, User, Bookmark, FileText, Settings } from "lucide-react";

export const seekerNavLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Saved Jobs", href: "/saved-jobs", icon: Bookmark },
    { name: "Applications", href: "/applications", icon: FileText },
    // { name: "Settings", href: "/settings", icon: Settings },
];

export const EMPLOYER_NAV = [
    { name: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/employer/jobs", icon: FileText },
    { name: "Profile", href: "/employer/profile", icon: User },
];
