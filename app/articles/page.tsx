"use client";

import DemoCard from "@/components/DemoCard";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

export default function ArticlesPage() {
  const { t } = useT();
  const c = t.home.cards;

  return (
    <main
      className="mx-auto min-h-screen"
      style={{
        maxWidth: "var(--content-width)",
        padding: "calc(48px + 0.75rem + 3rem) var(--content-padding) 6rem",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <section className="mb-14">
        <h1
          className="font-extrabold tracking-[-0.04em] leading-[1.1] mb-4"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            color: "var(--color-text-primary)",
          }}
        >
          dev-radar
        </h1>

        <p
          className="max-w-135 leading-[1.75] mb-8"
          style={{
            fontSize: "1rem",
            color: "var(--color-text-secondary)",
          }}
        >
          {t.home.subtitle}
        </p>

        {/* Stats */}
        <div className="flex gap-10 flex-wrap">
          {[
            { value: "5", label: t.home.stats.demos },
            { value: "16.3", label: t.home.stats.nextVersion },
            { value: "19.2", label: t.home.stats.reactVersion },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                className="font-extrabold font-mono tracking-[-0.03em]"
                style={{
                  fontSize: "1.75rem",
                  color: "var(--color-text-primary)",
                }}
              >
                {stat.value}
              </div>
              <div
                className="tracking-[0.02em]"
                style={{
                  fontSize: "0.78rem",
                  color: "var(--color-text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div
        className="h-px my-10"
        style={{ background: "var(--color-border-subtle)" }}
      />

      {/* ── Demo Cards Grid ────────────────────────────────────── */}
      <section aria-label="Feature demos">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))" }}>
          <DemoCard
            href="/demos/view-transitions"
            icon="🎬"
            title={c.viewTransitions.title}
            description={c.viewTransitions.description}
            tags={[
              { label: "React 19.2", type: "react" },
              { label: "Stable", type: "stable" },
              { label: "New API", type: "new" },
            ]}
            version="react@19.2"
            accentColor="var(--color-accent-cyan)"
            viewDemoLabel={t.home.viewDemo}
          />

          <DemoCard
            href="/demos/server-actions"
            icon="⚡"
            title={c.serverActions.title}
            description={c.serverActions.description}
            tags={[
              { label: "Next.js 16", type: "next" },
              { label: "updateTag", type: "new" },
              { label: "Server Action", type: "stable" },
            ]}
            version="next@16"
            accentColor="var(--color-accent-purple)"
            viewDemoLabel={t.home.viewDemo}
          />

          <DemoCard
            href="/demos/use-effect-event"
            icon="🎯"
            title={c.useEffectEvent.title}
            description={c.useEffectEvent.description}
            tags={[
              { label: "React 19.2", type: "react" },
              { label: "Stable", type: "stable" },
              { label: "New Hook", type: "new" },
            ]}
            version="react@19.2"
            accentColor="var(--color-accent-amber)"
            viewDemoLabel={t.home.viewDemo}
          />

          <DemoCard
            href="/demos/use-cache"
            icon="🗄️"
            title={c.useCache.title}
            description={c.useCache.description}
            tags={[
              { label: "Next.js 16", type: "next" },
              { label: "cacheLife", type: "new" },
              { label: "cacheTag", type: "new" },
            ]}
            version="next@16"
            accentColor="var(--color-accent-green)"
            viewDemoLabel={t.home.viewDemo}
          />

          <DemoCard
            href="/demos/instant-navigation"
            icon="🚀"
            title={c.instantNav.title}
            description={c.instantNav.description}
            tags={[
              { label: "Next.js 16", type: "next" },
              { label: "Cache Components", type: "new" },
              { label: "PPR", type: "stable" },
            ]}
            version="next@16"
            accentColor="var(--color-accent-blue)"
            viewDemoLabel={t.home.viewDemo}
          />

          <DemoCard
            href="/articles/event-loop"
            icon="♾️"
            title={c.eventLoop.title}
            description={c.eventLoop.description}
            tags={[
              { label: "JavaScript", type: "stable" },
              { label: "Interactive", type: "new" },
            ]}
            version="article"
            accentColor="var(--color-accent-purple)"
            viewDemoLabel={c.eventLoop.cta}
          />
        </div>
      </section>


      {/* ── Bottom callout ─────────────────────────────────────── */}
      <section
        className={cn(
          "mt-12 px-8 py-7 rounded-[12px]",
          "flex items-center justify-between flex-wrap gap-4"
        )}
        style={{
          background: "var(--color-bg-card)",
          border: "1px solid var(--color-border-card)",
          boxShadow: "var(--shadow-glow-primary)",
        }}
      >
        <div>
          <h2
            className="font-bold mb-1 tracking-[-0.02em]"
            style={{
              fontSize: "1rem",
              color: "var(--color-text-primary)",
            }}
          >
            {t.home.cta.title}
          </h2>
          <p
            className="m-0"
            style={{
              fontSize: "0.875rem",
              color: "var(--color-text-muted)",
            }}
          >
            {t.home.cta.description}
          </p>
        </div>
        <a
          href="https://github.com/ercanyesil/dev-radar"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-[1.1rem] py-[0.55rem]",
            "border-none rounded-lg font-semibold cursor-pointer",
            "font-sans tracking-[-0.01em]",
            "transition-opacity transition-transform duration-200",
            "hover:opacity-[0.88] hover:-translate-y-px",
            "active:translate-y-0"
          )}
          style={{
            fontSize: "0.85rem",
            background: "var(--color-text-primary)",
            color: "var(--color-bg-base)",
          }}
          id="github-cta-btn"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {t.home.cta.button}
        </a>
      </section>
    </main>
  );
}
