import { LayoutDashboard, User, Bookmark, FileText, PlusSquare, Users, Briefcase } from "lucide-react";

export const seekerNavLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Saved Jobs", href: "/saved-jobs", icon: Bookmark },
    { name: "Applications", href: "/applications", icon: FileText },
    { name: "Jobs", href: "/jobs", icon: Briefcase },
];

export const employerNavLinks = [
    { name: "Dashboard", href: "/employer/dashboard", icon: LayoutDashboard },
    { name: "Post a Job", href: "/employer/post-job", icon: PlusSquare },
    { name: "Jobs", href: "/employer/jobs", icon: FileText },
    // { name: "Applicants", href: "/employer/applicants", icon: Users },
    // { name: "Profile", href: "/employer/profile", icon: User },
];
