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
    <div className="rounded-[12px] overflow-hidden border border-[var(--color-border-card)] my-5">
      {/* File header */}
      {filename && (
        <div className="bg-[#0d1020] border-b border-[var(--color-border-subtle)] px-4 py-2 flex items-center gap-2">
          <div className="flex gap-[0.35rem]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e] block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840] block" />
          </div>
          <span className="text-[0.75rem] text-[var(--color-text-muted)] font-mono ml-2">
            {filename}
          </span>
          <span className="ml-auto text-[0.65rem] text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
            {language}
          </span>
        </div>
      )}

      {/* Code */}
      <pre
        className="m-0 bg-[#090c1a]"
        style={{
          borderRadius: filename ? "0 0 var(--radius-sm) var(--radius-sm)" : "var(--radius-sm)",
        }}
      >
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
