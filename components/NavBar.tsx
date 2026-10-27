"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/context";
import { useTheme } from "@/lib/theme/context";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

// ─── Sun Icon ─────────────────────────────────────────────────────────────────
const SunIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

// ─── Moon Icon ─────────────────────────────────────────────────────────────────
const MoonIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function NavBar() {
  const pathname = usePathname();
  const { t, toggle, locale } = useT();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isArticles = pathname === "/articles" || pathname.startsWith("/demos");
  const isHome = pathname === "/";

  const navLinks = [
    { label: t.nav.about, href: isHome ? "#about" : "/#about" },
    { label: t.nav.work, href: isHome ? "#work" : "/#work" },
    { label: t.nav.projects, href: isHome ? "#projects" : "/#projects" },
    { label: t.nav.articles, href: "/articles", exact: true },
    { label: t.nav.contact, href: isHome ? "#contact" : "/#contact" },
  ];

  const isLinkActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href || pathname.startsWith("/demos");
    return false;
  };

  const isDark = theme === "dark";

  return (
    <nav
      className={cn(
        // Base — pill shape, fixed floating navbar
        "fixed top-3 left-1/2 -translate-x-1/2 z-100",
        "border border-transparent rounded-full",
        "backdrop-blur-[0.001px]",
        "[view-transition-name:site-navbar]",
        "w-[calc(var(--content-width)-2rem)] max-w-[calc(100vw-2rem)]",
        "transition-[background,border-color,backdrop-filter,box-shadow] duration-300 ease-in-out",
        // Scrolled state
        scrolled && "bg-background/80 backdrop-blur-md border border-border/50 shadow-sm"
      )}
    >
      {/* Inner grid: logo | nav links | right controls */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center h-12 px-5">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center text-text-primary no-underline transition-opacity duration-200 hover:opacity-80"
        >
          <Logo height={22} />
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-3 py-1.4 rounded-full text-sm font-medium cursor-pointer tracking-[-0.01em]",
                "text-(--color-text-secondary) transition-[color,background] duration-200",
                "hover:text-text-primary hover:bg-white/6 hover:opacity-100",
                isLinkActive(link.href, link.exact) &&
                  "text-text-primary bg-white/6"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 justify-end">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            id="theme-toggle-btn"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "relative inline-flex items-center justify-center w-8.5 h-8.5",
              "rounded-lg border border-border-card bg-transparent",
              "text-(--color-text-secondary) cursor-pointer overflow-hidden shrink-0",
              "transition-[color,border-color,background,transform] duration-200",
              "hover:text-text-primary hover:border-border-hover hover:bg-[rgba(128,128,128,0.08)]",
              "active:scale-[0.93]"
            )}
          >
            <span className={`theme-toggle-icon ${isDark ? "visible" : "hidden"}`}>
              <MoonIcon />
            </span>
            <span className={`theme-toggle-icon ${isDark ? "hidden" : "visible"}`}>
              <SunIcon />
            </span>
          </button>

          {/* Language toggle */}
          <button
            onClick={toggle}
            id="lang-toggle-btn"
            aria-label={t.nav.langLabel}
            title={t.nav.langLabel}
            className={cn(
              "px-3 py-1.4 rounded-full text-sm font-medium cursor-pointer tracking-[-0.01em]",
              "text-(--color-text-secondary) transition-[color,background] duration-200",
              "hover:text-text-primary hover:bg-white/6",
              "bg-transparent border-none font-mono text-[0.8rem]"
            )}
          >
            {locale === "en" ? "TR" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
