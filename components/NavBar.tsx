"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n/context";

export default function NavBar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t, toggle, locale } = useT();

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link
        href="/"
        style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 16,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.05em",
          }}
        >
          DR
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          dev-radar
        </span>
      </Link>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {t.nav.tagline}
        </span>

        {!isHome && (
          <Link
            href="/"
            className="btn-ghost"
            style={{ padding: "0.4rem 0.875rem", fontSize: "0.8rem" }}
          >
            {t.nav.allDemos}
          </Link>
        )}

        {/* Language toggle */}
        <button
          onClick={toggle}
          id="lang-toggle-btn"
          aria-label={t.nav.langLabel}
          title={t.nav.langLabel}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.4rem 0.75rem",
            background: "transparent",
            border: "1px solid var(--border-card)",
            borderRadius: 8,
            fontSize: "0.8rem",
            fontWeight: 700,
            fontFamily: "var(--font-mono)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            transition: "color 0.2s, border-color 0.2s, background 0.2s",
            letterSpacing: "0.04em",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "var(--text-primary)";
            el.style.borderColor = "var(--border-hover)";
            el.style.background = "rgba(99, 102, 241, 0.06)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "var(--text-secondary)";
            el.style.borderColor = "var(--border-card)";
            el.style.background = "transparent";
          }}
        >
          {/* Flag */}
          <span style={{ fontSize: "1rem" }}>
            {locale === "en" ? "🇹🇷" : "🇬🇧"}
          </span>
          {t.nav.langToggle}
        </button>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost"
          style={{ padding: "0.4rem 0.875rem", fontSize: "0.8rem" }}
          title={t.nav.github}
          id="navbar-github-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {t.nav.github}
        </a>
      </div>
    </nav>
  );
}
