import Link from "next/link";

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

export default function DemoCard({
  href,
  icon,
  title,
  description,
  tags,
  version,
  accentColor = "var(--accent-primary)",
  viewDemoLabel = "View demo",
}: DemoCardProps) {
  const badgeClass: Record<string, string> = {
    react: "badge-react",
    next: "badge-next",
    new: "badge-new",
    stable: "badge-stable",
  };

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <article
        className="glass-card"
        style={{
          padding: "1.75rem",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          cursor: "pointer",
        }}
      >
        {/* Background glow orb */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -40,
            right: -40,
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: accentColor,
            opacity: 0.06,
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />

        {/* Version tag */}
        <div
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            fontSize: "0.7rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-muted)",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid var(--border-subtle)",
            borderRadius: 4,
            padding: "0.15rem 0.4rem",
          }}
        >
          {version}
        </div>

        {/* Icon */}
        <div
          style={{
            fontSize: "2rem",
            marginBottom: "1rem",
            lineHeight: 1,
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h2
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            marginBottom: "0.5rem",
            letterSpacing: "-0.02em",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            marginBottom: "1.25rem",
          }}
        >
          {description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
          {tags.map((tag) => (
            <span key={tag.label} className={`badge ${badgeClass[tag.type]}`}>
              {tag.label}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.375rem",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: accentColor,
          }}
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
