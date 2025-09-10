import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
