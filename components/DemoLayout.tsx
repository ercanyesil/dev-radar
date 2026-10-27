"use client";

import Link from "next/link";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

interface DemoLayoutProps {
  title: string;
  subtitle: string;
  description: string;
  tags: { label: string; type: "react" | "next" | "new" | "stable" }[];
  docsUrl?: string;
  children: React.ReactNode;
}

const badgeStyles: Record<string, string> = {
  react: "bg-[rgba(6,182,212,0.12)] border border-[rgba(6,182,212,0.25)] text-[var(--color-accent-cyan)]",
  next: "bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.15)] text-[var(--color-text-secondary)]",
  new: "bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] text-[var(--color-accent-green)]",
  stable: "bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] text-[var(--color-accent-amber)]",
};

export default function DemoLayout({
  title,
  subtitle,
  description,
  tags,
  docsUrl,
  children,
}: DemoLayoutProps) {
  const { t } = useT();

  return (
    <main className="min-h-screen pt-[5.25rem] px-8 pb-16 max-w-[900px] mx-auto">
      {/* Header */}
      <header className="mb-10">
        {/* Demo label */}
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.1em] uppercase text-[var(--color-text-muted)] mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-[var(--color-text-muted)] before:rounded-[1px]">
          {subtitle}
        </div>

        <h1
          className="gradient-text font-extrabold tracking-[-0.03em] leading-[1.1] mb-4"
          style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
        >
          {title}
        </h1>

        <p className="text-[1.05rem] max-w-[640px] mb-5">{description}</p>

        <div className="flex flex-wrap gap-2 items-center">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-[0.2rem] rounded-full",
                "text-[0.7rem] font-semibold tracking-[0.03em] uppercase",
                badgeStyles[tag.type]
              )}
            >
              {tag.label}
            </span>
          ))}
          {docsUrl && (
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.75rem] text-[var(--color-text-muted)] ml-2 flex items-center gap-1"
            >
              {t.layout.docs}
            </a>
          )}
        </div>
      </header>

      {/* Divider */}
      <div className="h-px bg-[var(--color-border-subtle)] my-10" />

      {children}

      {/* Divider */}
      <div className="h-px bg-[var(--color-border-subtle)] my-10" />

      {/* Footer nav */}
      <div className="text-center pt-4">
        <Link
          href="/articles"
          className={cn(
            "inline-flex items-center gap-2 px-[1.1rem] py-[0.55rem]",
            "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-card)] rounded-lg",
            "text-[0.85rem] font-medium cursor-pointer font-sans",
            "transition-[color,border-color,background] duration-200",
            "hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[rgba(255,255,255,0.04)]"
          )}
        >
          {t.layout.back}
        </Link>
      </div>
    </main>
  );
}
