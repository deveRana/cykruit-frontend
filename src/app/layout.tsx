import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { ReactNode } from "react";

import "@/styles/globals.css";
import { QueryClientProviderWrapper } from "@/lib/providers/query-client.provider";
import { ReduxProvider } from "@/lib/providers/redux.provider";
import { MessageModalProvider } from "@/components/common/MessageModal"; // <-- updated

const lexend = Lexend({
  variable: "--font-lexend",
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
        className={`${lexend.variable} antialiased `}
        style={{ fontFamily: "var(--font-lexend)" }}
      >
        <ReduxProvider>
          <QueryClientProviderWrapper>
            <MessageModalProvider>
              {children}
            </MessageModalProvider>
          </QueryClientProviderWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
