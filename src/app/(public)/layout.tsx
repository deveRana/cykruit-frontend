import { ReactNode } from "react";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex flex-col">
            <main>{children}</main>
            <Footer />
        </div>
    );
}
