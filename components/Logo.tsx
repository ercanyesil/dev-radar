interface LogoProps {
  className?: string;
  /** Height of the icon in px. The wordmark scales with it. */
  height?: number;
}

/**
 * "ey" logo — a monitor showing code brackets (the green slash is the
 * signature detail) next to a bold "ey" wordmark with a green underline.
 * Everything follows `currentColor` except the green accents.
 */
export default function Logo({ className, height = 26 }: LogoProps) {
  return (
    <span
      className={className}
      role="img"
      aria-label="ey"
      style={{ display: "inline-flex", alignItems: "center", gap: height * 0.32, lineHeight: 1 }}
    >
      <svg
        height={height}
        viewBox="0 0 28 26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ width: "auto", aspectRatio: "28 / 26", flexShrink: 0 }}
      >
        {/* monitor */}
        <rect x="1.5" y="1.5" width="25" height="17" rx="3" />
        <path d="M14 18.5V23M8.5 24h11" />
        {/* < / > */}
        <path d="M10.5 6.8L7 10l3.5 3.2M17.5 6.8L21 10l-3.5 3.2" />
        <path d="M15.2 6L12.8 14" stroke="var(--color-accent-green)" strokeWidth="2" />
      </svg>

      <span style={{ position: "relative", display: "inline-block", paddingBottom: height * 0.14 }}>
        <span
          style={{
            display: "block",
            fontWeight: 800,
            fontSize: height * 0.82,
            letterSpacing: "-0.04em",
          }}
        >
          ey
        </span>
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "100%",
            height: Math.max(2, height * 0.08),
            borderRadius: 999,
            background: "var(--color-accent-green)",
          }}
        />
      </span>
    </span>
  );
}
