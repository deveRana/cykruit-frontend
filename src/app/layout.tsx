import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google"; // 👈 use Red Hat Display
import { ReactNode } from "react";

import "@/styles/globals.css";
import { QueryClientProviderWrapper } from "@/lib/providers/query-client.provider";
import { ReduxProvider } from "@/lib/providers/redux.provider";
import { MessageModalProvider } from "@/components/common/MessageModal";
import { ToastProvider } from "@/components/common/Toast";
import { RootLayoutInner } from "./RootLayoutInner";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // adjust as needed
});

export const metadata: Metadata = {
  title: "Cykruit",
  description: "Cybersecurity Jobs Portal",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${redHatDisplay.variable} antialiased`}
        style={{ fontFamily: "var(--font-red-hat-display)" }}
      >
        <ReduxProvider>
          <QueryClientProviderWrapper>
            <MessageModalProvider>
              <ToastProvider>
                <RootLayoutInner>{children}</RootLayoutInner>
              </ToastProvider>
            </MessageModalProvider>
          </QueryClientProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
