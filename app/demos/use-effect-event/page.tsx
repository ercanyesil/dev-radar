"use client";

import { useEffect, useRef, useState, useEffectEvent } from "react";
import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

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
    <div className="bg-bg-surface border border-border-card rounded-[12px] p-8 my-6">
      <div className="mb-5">
        <label className="block mb-2 text-[0.875rem] font-semibold text-(--color-text-secondary)">
          {uee.urlLabel}
        </label>
        <div className="flex gap-2 flex-wrap">
          {["/home", "/dashboard", "/profile"].map((u) => (
            <button
              key={u}
              id={`url-btn-${u.slice(1)}`}
              onClick={() => setUrl(u)}
              className={cn(
                "px-3.5 py-[0.4rem] text-[0.8rem] rounded-lg transition-[opacity,transform] duration-200",
                url === u
                  ? "bg-text-primary text-bg-base border-none font-semibold cursor-pointer font-sans tracking-[-0.01em] hover:opacity-[0.88] hover:-translate-y-px active:translate-y-0"
                  : "bg-transparent text-(--color-text-secondary) border border-border-card font-medium cursor-pointer transition-[color,border-color,background] hover:text-text-primary hover:border-border-hover hover:bg-[rgba(255,255,255,0.04)]"
              )}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-bg-base rounded-lg border border-border-subtle p-4 font-mono text-[0.75rem]">
        <div className="text-accent-primary mb-2 font-semibold">{uee.logTitle}</div>
        <div className="text-text-muted mb-2">
          {uee.logCurrent}: {scrollY}px · {uee.logActive}:{" "}
          <span className="text-accent-cyan">{url}</span>
        </div>
        {logs.length === 0 ? (
          <div className="text-text-muted">{uee.logEmpty}</div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={i === 0 ? "text-text-accent" : "text-text-muted"}
            >
              {log}
            </div>
          ))
        )}
      </div>
      <p className="text-[0.75rem] text-text-muted mt-3">
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
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {uee.problemLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{uee.problemTitle}</h2>
        <p className="mb-4">{uee.problemDesc}</p>
        <CodeBlock code={PROBLEM_CODE} filename="hooks/useAnalytics.ts" language="ts" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- The Solution --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {uee.solutionLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{uee.solutionTitle}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: uee.solutionDesc }} />
        <CodeBlock code={SOLUTION_CODE} filename="hooks/useAnalytics.ts" language="ts" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Live Demo --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {uee.demoLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{uee.demoTitle}</h2>
        <p className="mb-5">{uee.demoDesc}</p>
        <ScrollLogger />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Rules --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {uee.rulesLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{uee.rulesTitle}</h2>
        <CodeBlock code={RULES_CODE} filename="hooks/useTimer.ts" language="ts" />

        {/* Key insight */}
        <div className="bg-[rgba(245,158,11,0.08)] border border-[rgba(245,158,11,0.2)] rounded-lg px-5 py-4 mt-4 text-[0.875rem]">
          <strong className="text-accent-amber">{uee.insightTitle}</strong>{" "}
          <span className="text-(--color-text-secondary)">{uee.insightText}</span>
        </div>
      </section>
    </DemoLayout>
  );
}
