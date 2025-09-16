import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ReactNode } from "react";

import "@/styles/globals.css";
import { QueryClientProviderWrapper } from "@/lib/providers/query-client.provider";
import { ReduxProvider } from "@/lib/providers/redux.provider";
import { MessageModalProvider } from "@/components/common/MessageModal";
import { ToastProvider } from "@/components/common/Toast"; // 👈 import toast provider

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Cykruit",
  description: "Cybersecurity Jobs Portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} antialiased`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        <ReduxProvider>
          <QueryClientProviderWrapper>
            <MessageModalProvider>
              <ToastProvider>
                {children}
              </ToastProvider>
            </MessageModalProvider>
          </QueryClientProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
