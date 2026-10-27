import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import { LanguageProvider } from "@/lib/i18n/context";
import { ThemeProvider } from "@/lib/theme/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ercan Yeşil — Software Developer",
  description:
    "Software developer specializing in web applications, mobile apps, and backend systems. Co-founder of Cross4Cloud. Building dev-radar — a Next.js & React feature showcase.",
  keywords: [
    "Ercan Yeşil",
    "Software Developer",
    "Frontend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Cross4Cloud",
    "dev-radar",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      {/* Anti-flash script: runs before paint to apply saved theme */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('dev-radar-theme');if(t==='light'){document.documentElement.classList.add('light');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <NavBar />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
