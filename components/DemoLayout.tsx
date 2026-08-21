"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/context";

interface DemoLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  tags: { label: string; type: "react" | "next" | "new" | "stable" }[];
  docsUrl?: string;
  children: React.ReactNode;
}

export default function DemoLayout({
  title,
  subtitle,
  description,
  tags,
  docsUrl,
  children,
}: DemoLayoutProps) {
  const { t } = useT();

  const badgeClass: Record<string, string> = {
    react: "badge-react",
    next: "badge-next",
    new: "badge-new",
    stable: "badge-stable",
  };

  return (
    <main className="demo-page">
      {/* Header */}
      <header style={{ marginBottom: "2.5rem" }}>
        <div className="demo-label">{subtitle}</div>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
            lineHeight: 1.1,
          }}
          className="gradient-text"
        >
          {title}
        </h1>
        <p style={{ fontSize: "1.05rem", maxWidth: 640, marginBottom: "1.25rem" }}>
          {description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          {tags.map((tag) => (
            <span key={tag.label} className={`badge ${badgeClass[tag.type]}`}>
              {tag.label}
            </span>
          ))}
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.75rem",
                color: "var(--text-muted)",
                marginLeft: "0.5rem",
                display: "flex",
                alignItems: "center",
                gap: "0.25rem",
              }}
            >
              {t.layout.docs}
            </a>
          )}
        </div>
      </header>

      <div className="divider" />

      {children}

      <div className="divider" />

      {/* Footer nav */}
      <div style={{ textAlign: "center", paddingTop: "1rem" }}>
        <Link href="/" className="btn-ghost">
          {t.layout.back}
        </Link>
      </div>
    </main>
  );
}
