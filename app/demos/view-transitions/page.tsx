"use client";

import { ViewTransition } from "react";
import { useState } from "react";
import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import { useT } from "@/lib/i18n/context";

const PHOTOS = [
  { id: "1", emoji: "🌄", color: "#6366f1" },
  { id: "2", emoji: "🌊", color: "#06b6d4" },
  { id: "3", emoji: "🌲", color: "#10b981" },
  { id: "4", emoji: "🌸", color: "#ec4899" },
  { id: "5", emoji: "🏙️", color: "#f59e0b" },
  { id: "6", emoji: "🌅", color: "#ef4444" },
];

const SHARED_ELEMENT_CODE = `// components/photo-grid.tsx
import { ViewTransition } from 'react'
import Link from 'next/link'

function PhotoGrid({ photos }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {photos.map((photo) => (
        <Link key={photo.id} href={\`/photo/\${photo.id}\`}
          transitionTypes={['nav-forward']}>
          <ViewTransition name={\`photo-\${photo.id}\`}>
            <img src={photo.src} alt={photo.title} />
          </ViewTransition>
        </Link>
      ))}
    </div>
  )
}`;

const DETAIL_CODE = `// app/photo/[id]/photo-content.tsx
import { ViewTransition } from 'react'

async function PhotoContent({ id }) {
  const photo = await getPhoto(id)

  return (
    // Same name = browser animates between positions
    <ViewTransition name={\`photo-\${photo.id}\`}>
      <div style={{ position: 'relative', aspectRatio: '3 / 2' }}>
        <img src={photo.src} alt={photo.title} fill />
      </div>
    </ViewTransition>
  )
}`;

const NAV_CODE = `// For directional navigation
<Link
  href="/photo/next"
  transitionTypes={['nav-forward']}
>
  Next →
</Link>

<Link
  href="/"
  transitionTypes={['nav-back']}
>
  ← Gallery
</Link>

// Wrap page content to respond to direction
<ViewTransition
  enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
  exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
  default="none"
>
  {/* page content */}
</ViewTransition>`;

export default function ViewTransitionsDemo() {
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useT();
  const vt = t.viewTransitions;

  return (
    <DemoLayout
      title={vt.title}
      subtitle={vt.subtitle}
      description={vt.description}
      tags={[
        { label: "React 19.2", type: "react" },
        { label: "Stable", type: "stable" },
        { label: "ViewTransition", type: "new" },
      ]}
      docsUrl="https://react.dev/reference/react/ViewTransition"
    >
      {/* --- Pattern 1: Shared element morph --- */}
      <section className="demo-section">
        <div className="demo-label">{vt.p1Label}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {vt.p1Title}
        </h2>
        <p style={{ marginBottom: "1.5rem" }}
          dangerouslySetInnerHTML={{ __html: vt.p1Desc }}
        />

        {/* Interactive demo */}
        <div className="demo-interactive">
          {selected ? (
            /* Detail view */
            <div style={{ textAlign: "center" }}>
              <ViewTransition name={`photo-${selected}`}>
                <div
                  style={{
                    width: 160,
                    height: 160,
                    borderRadius: 16,
                    background: PHOTOS.find((p) => p.id === selected)?.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "5rem",
                    margin: "0 auto 1rem",
                  }}
                >
                  {PHOTOS.find((p) => p.id === selected)?.emoji}
                </div>
              </ViewTransition>
              <p style={{ fontSize: "0.875rem", marginBottom: "1.5rem" }}>
                {vt.detailNote}{" "}
                <code>{"<ViewTransition name={`photo-${id}`}>"}</code>
              </p>
              <button
                className="btn-ghost"
                onClick={() => setSelected(null)}
                id="vt-back-btn"
              >
                {vt.backToGallery}
              </button>
            </div>
          ) : (
            /* Grid view */
            <div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
                {vt.gridHint}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "0.75rem",
                }}
              >
                {PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    id={`photo-card-${photo.id}`}
                    onClick={() => setSelected(photo.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
                  >
                    <ViewTransition name={`photo-${photo.id}`}>
                      <div
                        style={{
                          borderRadius: 12,
                          background: photo.color,
                          aspectRatio: "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "2.5rem",
                          opacity: 0.9,
                          transition: "opacity 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = "1";
                          (e.currentTarget as HTMLElement).style.transform = "scale(1.04)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = "0.9";
                          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                        }}
                      >
                        {photo.emoji}
                      </div>
                    </ViewTransition>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <CodeBlock code={SHARED_ELEMENT_CODE} filename="components/photo-grid.tsx" language="tsx" />
        <CodeBlock code={DETAIL_CODE} filename="app/photo/[id]/photo-content.tsx" language="tsx" />
      </section>

      <div className="divider" />

      {/* --- Pattern 2: Directional nav --- */}
      <section className="demo-section">
        <div className="demo-label">{vt.p2Label}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {vt.p2Title}
        </h2>
        <p style={{ marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: vt.p2Desc }}
        />

        {/* Key insight box */}
        <div
          style={{
            background: "rgba(99, 102, 241, 0.08)",
            border: "1px solid rgba(99, 102, 241, 0.2)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem 1.25rem",
            marginBottom: "1rem",
            fontSize: "0.875rem",
          }}
        >
          <strong style={{ color: "var(--text-accent)" }}>{vt.insightTitle}</strong>{" "}
          <span style={{ color: "var(--text-secondary)" }}
            dangerouslySetInnerHTML={{ __html: vt.insightText }}
          />
        </div>

        <CodeBlock code={NAV_CODE} filename="app/photo/[id]/page.tsx" language="tsx" />
      </section>

      <div className="divider" />

      {/* --- Pattern 3: CSS keyframes summary --- */}
      <section className="demo-section">
        <div className="demo-label">{vt.p3Label}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {vt.p3Title}
        </h2>
        <p style={{ marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: vt.p3Desc }}
        />
        <CodeBlock
          code={`/* globals.css */
::view-transition-old(.nav-forward) {
  --slide-offset: -60px;
  animation: 150ms ease-in both fade-out, 400ms ease-in-out both slide-x reverse;
}
::view-transition-new(.nav-forward) {
  --slide-offset: 60px;
  animation: 210ms ease-out 150ms both fade-in, 400ms ease-in-out both slide-x;
}

/* Anchor the header — don't let it slide */
::view-transition-group(site-header) {
  animation: none; z-index: 100;
}
::view-transition-old(site-header) { display: none; }
::view-transition-new(site-header) { animation: none; }

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(*), ::view-transition-new(*), ::view-transition-group(*) {
    animation-duration: 0s !important;
  }
}`}
          filename="app/globals.css"
          language="css"
        />
      </section>

      {/* Key facts */}
      <section className="demo-section">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {(["✅", "⚡", "🎨", "🛡️"] as const).map((icon, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "var(--radius-sm)",
                padding: "1rem",
                fontSize: "0.875rem",
                color: "var(--text-secondary)",
                display: "flex",
                gap: "0.5rem",
              }}
            >
              <span>{icon}</span>
              <span>{vt.facts[i]}</span>
            </div>
          ))}
        </div>
      </section>
    </DemoLayout>
  );
}
