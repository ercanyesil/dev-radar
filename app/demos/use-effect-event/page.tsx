"use client";

import { useEffect, useRef, useState, useEffectEvent } from "react";
import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import { useT } from "@/lib/i18n/context";

const PROBLEM_CODE = `// ❌ PROBLEM: stale closure bug
// 'url' must be in the dependency array → re-runs on every URL change
// But you only want to log when count changes, not when url changes

function useAnalytics(url: string) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // url is read inside the effect, so it MUST be in deps
    fetch('/api/log', { body: JSON.stringify({ url, count }) })
  }, [url, count])  // ← url here causes unwanted re-runs!
}`;

const SOLUTION_CODE = `// ✅ SOLUTION: useEffectEvent — React 19.2
// Separate the "reactive" part (count) from the "non-reactive" part (url)

import { useEffect, useEffectEvent } from 'react'

function useAnalytics(url: string) {
  const [count, setCount] = useState(0)

  // onVisit reads the LATEST url at call time, but is NOT reactive
  // It will NOT be listed in useEffect's dependency array
  const onVisit = useEffectEvent((count: number) => {
    fetch('/api/log', { body: JSON.stringify({ url, count }) })
    //                                          ↑ always the latest value
  })

  useEffect(() => {
    onVisit(count)   // ← onVisit is excluded from deps, count is reactive
  }, [count])         // Only re-runs when count changes ✅
}`;

const RULES_CODE = `// Rules of useEffectEvent:
//
// 1. Call only inside useEffect (not in event handlers or JSX)
// 2. Never pass to other components or hooks
// 3. The returned function reads latest prop/state at CALL TIME, not at hook time
//
// Think of it as: "freeze the logic, not the values"

const onTick = useEffectEvent(() => {
  // Reads current count even though count is not in useEffect deps
  console.log('Tick', count)
})

useEffect(() => {
  const id = setInterval(onTick, 1000)
  return () => clearInterval(id)
}, [])  // ← empty deps! onTick always sees latest count`;

// ============================================================
// Interactive component — uses useEffectEvent
// ============================================================
function ScrollLogger() {
  const [scrollY, setScrollY] = useState(0);
  const [url, setUrl] = useState("/home");
  const [logs, setLogs] = useState<string[]>([]);
  const { t } = useT();
  const uee = t.useEffectEvent;

  const onScroll = useEffectEvent((y: number) => {
    const entry = `[${url}] scrollY: ${y}px`;
    setLogs((prev) => [entry, ...prev.slice(0, 4)]);
  });

  useEffect(() => {
    const handler = () => {
      const y = Math.round(window.scrollY);
      setScrollY(y);
      onScroll(y);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="demo-interactive">
      <div style={{ marginBottom: "1.25rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          {uee.urlLabel}
        </label>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {["/home", "/dashboard", "/profile"].map((u) => (
            <button
              key={u}
              id={`url-btn-${u.slice(1)}`}
              onClick={() => setUrl(u)}
              className={url === u ? "btn-primary" : "btn-ghost"}
              style={{ padding: "0.4rem 0.875rem", fontSize: "0.8rem" }}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "var(--bg-base)",
          borderRadius: "var(--radius-sm)",
          border: "1px solid var(--border-subtle)",
          padding: "1rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
        }}
      >
        <div style={{ color: "var(--accent-primary)", marginBottom: "0.5rem", fontWeight: 600 }}>
          {uee.logTitle}
        </div>
        <div style={{ color: "var(--text-muted)", marginBottom: "0.5rem" }}>
          {uee.logCurrent}: {scrollY}px · {uee.logActive}:{" "}
          <span style={{ color: "var(--accent-cyan)" }}>{url}</span>
        </div>
        {logs.length === 0 ? (
          <div style={{ color: "var(--text-muted)" }}>{uee.logEmpty}</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} style={{ color: i === 0 ? "var(--text-accent)" : "var(--text-muted)" }}>
              {log}
            </div>
          ))
        )}
      </div>
      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.75rem" }}>
        ✅ {uee.logHint}
      </p>
    </div>
  );
}

export default function UseEffectEventDemo() {
  const { t } = useT();
  const uee = t.useEffectEvent;

  return (
    <DemoLayout
      title={uee.title}
      subtitle={uee.subtitle}
      description={uee.description}
      tags={[
        { label: "React 19.2", type: "react" },
        { label: "Stable", type: "stable" },
        { label: "New Hook", type: "new" },
      ]}
      docsUrl="https://react.dev/reference/react/useEffectEvent"
    >
      {/* --- The Problem --- */}
      <section className="demo-section">
        <div className="demo-label">{uee.problemLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uee.problemTitle}
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          {uee.problemDesc}
        </p>
        <CodeBlock code={PROBLEM_CODE} filename="hooks/useAnalytics.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- The Solution --- */}
      <section className="demo-section">
        <div className="demo-label">{uee.solutionLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uee.solutionTitle}
        </h2>
        <p style={{ marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: uee.solutionDesc }}
        />
        <CodeBlock code={SOLUTION_CODE} filename="hooks/useAnalytics.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- Live Demo --- */}
      <section className="demo-section">
        <div className="demo-label">{uee.demoLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uee.demoTitle}
        </h2>
        <p style={{ marginBottom: "1.25rem" }}>
          {uee.demoDesc}
        </p>
        <ScrollLogger />
      </section>

      <div className="divider" />

      {/* --- Rules --- */}
      <section className="demo-section">
        <div className="demo-label">{uee.rulesLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uee.rulesTitle}
        </h2>
        <CodeBlock code={RULES_CODE} filename="hooks/useTimer.ts" language="ts" />

        {/* Key insight */}
        <div
          style={{
            background: "rgba(245, 158, 11, 0.08)",
            border: "1px solid rgba(245, 158, 11, 0.2)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
            marginTop: "1rem",
            fontSize: "0.875rem",
          }}
        >
          <strong style={{ color: "var(--accent-amber)" }}>{uee.insightTitle}</strong>{" "}
          <span style={{ color: "var(--text-secondary)" }}>
            {uee.insightText}
          </span>
        </div>
      </section>
    </DemoLayout>
  );
}
