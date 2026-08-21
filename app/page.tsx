"use client";

import DemoCard from "@/components/DemoCard";
import { useT } from "@/lib/i18n/context";

export default function Home() {
  const { t } = useT();
  const c = t.home.cards;

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "7rem 2rem 4rem",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Hero */}
      <section style={{ textAlign: "center", marginBottom: "4rem" }}>
        {/* Version badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.35rem 1rem",
            background: "rgba(99, 102, 241, 0.1)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono)",
            color: "var(--text-accent)",
            marginBottom: "1.5rem",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--accent-green)",
              display: "inline-block",
            }}
            className="pulse"
          />
          {t.home.badge}
        </div>

        <h1
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            marginBottom: "1.5rem",
          }}
        >
          <span className="gradient-text">{t.home.title1}</span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>{t.home.title2}</span>
        </h1>

        <p
          style={{
            fontSize: "1.15rem",
            color: "var(--text-secondary)",
            maxWidth: 560,
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          {t.home.subtitle}
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "5", label: t.home.stats.demos },
            { value: "16.3", label: t.home.stats.nextVersion },
            { value: "19.2", label: t.home.stats.reactVersion },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "-0.03em",
                }}
                className="gradient-text"
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Cards Grid */}
      <section aria-label="Feature demos">
        <div className="grid-auto">
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
            accentColor="var(--accent-cyan)"
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
            accentColor="var(--accent-primary)"
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
            accentColor="#f59e0b"
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
            accentColor="#10b981"
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
            accentColor="#8b5cf6"
            viewDemoLabel={t.home.viewDemo}
          />
        </div>
      </section>

      {/* Bottom callout */}
      <section
        className="glass-card"
        style={{
          marginTop: "3rem",
          padding: "2rem 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            {t.home.cta.title}
          </h2>
          <p style={{ fontSize: "0.875rem", margin: 0 }}>
            {t.home.cta.description}
          </p>
        </div>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
          id="github-cta-btn"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          {t.home.cta.button}
        </a>
      </section>
    </main>
  );
}
