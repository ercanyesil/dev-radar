import Link from "next/link";
import { cn } from "@/lib/utils";

interface DemoCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  tags: { label: string; type: "react" | "next" | "new" | "stable" }[];
  version: string;
  accentColor?: string;
  viewDemoLabel?: string;
}

const badgeStyles: Record<string, string> = {
  react: "bg-[rgba(6,182,212,0.12)] border border-[rgba(6,182,212,0.25)] text-[var(--color-accent-cyan)]",
  next: "bg-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.15)] text-[var(--color-text-secondary)]",
  new: "bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] text-[var(--color-accent-green)]",
  stable: "bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] text-[var(--color-accent-amber)]",
};

export default function DemoCard({
  href,
  icon,
  title,
  description,
  tags,
  version,
  accentColor = "var(--color-accent-primary)",
  viewDemoLabel = "View demo",
}: DemoCardProps) {
  return (
    <Link href={href} className="no-underline">
      <article
        className={cn(
          "relative overflow-hidden cursor-pointer h-full p-7",
          "bg-[var(--color-bg-card)] border border-[var(--color-border-card)] rounded-[12px]",
          "shadow-[var(--shadow-glow-primary)]",
          "transition-[border-color,box-shadow,transform] duration-[250ms]",
          "hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-glow-hover)] hover:-translate-y-0.5"
        )}
      >
        {/* Background glow orb */}
        <div
          aria-hidden
          className="absolute pointer-events-none rounded-full blur-[40px] opacity-[0.06]"
          style={{
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            background: accentColor,
          }}
        />

        {/* Version tag */}
        <div
          className="absolute top-5 right-5 text-[0.7rem] font-mono text-[var(--color-text-muted)] bg-[rgba(255,255,255,0.04)] border border-[var(--color-border-subtle)] rounded-[4px] px-[0.4rem] py-[0.15rem]"
        >
          {version}
        </div>

        {/* Icon */}
        <div className="text-[2rem] mb-4 leading-none">{icon}</div>

        {/* Title */}
        <h2 className="text-[1.1rem] font-bold mb-2 tracking-[-0.02em] text-[var(--color-text-primary)]">
          {title}
        </h2>

        {/* Description */}
        <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.6] mb-5">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
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
        </div>

        {/* Arrow / CTA */}
        <div
          className="mt-6 flex items-center gap-1.5 text-[0.8rem] font-semibold"
          style={{ color: accentColor }}
        >
          {viewDemoLabel}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </article>
    </Link>
  );
}
