import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { LanguageProvider } from "@/lib/i18n/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "dev-radar — Next.js 16 & React 19.2 Feature Showcase",
  description:
    "Interactive demos for Next.js 16 and React 19.2's latest features: View Transitions, Server Actions, useEffectEvent, use cache, and Instant Navigation.",
  keywords: [
    "Next.js 16",
    "React 19.2",
    "View Transitions",
    "Server Actions",
    "useEffectEvent",
    "use cache",
    "Instant Navigation",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        <LanguageProvider>
          <NavBar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
