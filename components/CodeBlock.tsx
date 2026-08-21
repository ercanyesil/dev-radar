interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
}

/**
 * Simple styled code block with optional filename label.
 * Syntax coloring is done via CSS token classes applied inline.
 */
export default function CodeBlock({ code, filename, language = "tsx" }: CodeBlockProps) {
  return (
    <div
      style={{
        borderRadius: "var(--radius-card)",
        overflow: "hidden",
        border: "1px solid var(--border-card)",
        margin: "1.25rem 0",
      }}
    >
      {/* File header */}
      {filename && (
        <div
          style={{
            background: "#0d1020",
            borderBottom: "1px solid var(--border-subtle)",
            padding: "0.5rem 1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div style={{ display: "flex", gap: "0.35rem" }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "block" }} />
          </div>
          <span
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              fontFamily: "var(--font-mono)",
              marginLeft: "0.5rem",
            }}
          >
            {filename}
          </span>
          <span
            style={{
              marginLeft: "auto",
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {language}
          </span>
        </div>
      )}

      {/* Code */}
      <pre
        style={{
          margin: 0,
          borderRadius: filename ? "0 0 var(--radius-sm) var(--radius-sm)" : "var(--radius-sm)",
          background: "#090c1a",
        }}
      >
        <code style={{ fontFamily: "var(--font-mono)" }}>
          {code}
        </code>
      </pre>
    </div>
  );
}
