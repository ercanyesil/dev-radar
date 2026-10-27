"use client";

import { useT } from "@/lib/i18n/context";
import { eventLoopStrings } from "@/lib/i18n/eventLoop";
import EventLoopDemo from "./EventLoopDemo";

const p = { color: "var(--color-text-secondary)", lineHeight: 1.75, marginBottom: "1rem" } as const;
const h2 = {
  color: "var(--color-text-primary)",
  fontSize: "1.25rem",
  fontWeight: 700,
  letterSpacing: "-0.02em",
  margin: "2.5rem 0 0.75rem",
} as const;
const code = {
  fontFamily: "var(--font-mono)",
  fontSize: "0.85em",
  padding: "1px 6px",
  borderRadius: 6,
  border: "0.5px solid var(--color-border-card)",
  background: "var(--color-bg-surface)",
} as const;

export default function EventLoopArticle() {
  const { locale } = useT();
  const s = eventLoopStrings[locale];

  return (
    <main
      className="mx-auto min-h-screen"
      style={{
        maxWidth: "var(--content-width)",
        padding: "calc(48px + 0.75rem + 3rem) var(--content-padding) 6rem",
      }}
    >
      <article>
        <h1
          className="font-extrabold tracking-[-0.04em] leading-[1.15] mb-4"
          style={{ fontSize: "clamp(1.75rem, 4.5vw, 2.5rem)", color: "var(--color-text-primary)" }}
        >
          {s.title}
        </h1>
        <p style={p}>{s.intro}</p>

        <h2 style={h2}>{s.exampleHeading}</h2>
        <pre
          style={{
            ...code,
            display: "block",
            padding: "12px 14px",
            borderRadius: 10,
            overflowX: "auto",
            lineHeight: 1.7,
            color: "var(--color-text-primary)",
          }}
        >{`console.log('A');
setTimeout(() => console.log('B'), 0);
Promise.resolve().then(() => console.log('C'));
console.log('D');`}</pre>
        <p style={{ ...p, marginTop: "1rem" }}>
          {s.expectedOutput}: <code style={code}>A, D, C, B</code>. {s.watchBelow}
        </p>

        <EventLoopDemo />

        <h2 style={h2}>{s.rulesHeading}</h2>
        <ol style={{ ...p, paddingLeft: "1.25rem", listStyle: "decimal" }}>
          {s.rules.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
        <p style={p}>{s.outro}</p>
      </article>
    </main>
  );
}
