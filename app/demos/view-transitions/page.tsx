"use client";

import { ViewTransition } from "react";
import { useState } from "react";
import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

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
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {vt.p1Label}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{vt.p1Title}</h2>
        <p className="mb-6" dangerouslySetInnerHTML={{ __html: vt.p1Desc }} />

        {/* Interactive demo */}
        <div className="bg-bg-surface border border-border-card rounded-[12px] p-8 my-6">
          {selected ? (
            /* Detail view */
            <div className="text-center">
              <ViewTransition name={`photo-${selected}`}>
                <div
                  className="w-40 h-40 rounded-2xl flex items-center justify-center text-[5rem] mx-auto mb-4"
                  style={{ background: PHOTOS.find((p) => p.id === selected)?.color }}
                >
                  {PHOTOS.find((p) => p.id === selected)?.emoji}
                </div>
              </ViewTransition>
              <p className="text-[0.875rem] mb-6">
                {vt.detailNote}{" "}
                <code>{`<ViewTransition name={\`photo-\${id}\`}>`}</code>
              </p>
              <button
                className={cn(
                  "inline-flex items-center gap-2 px-[1.1rem] py-[0.55rem]",
                  "bg-transparent text-(--color-text-secondary) border border-border-card rounded-lg",
                  "text-[0.85rem] font-medium cursor-pointer transition-[color,border-color,background] duration-200",
                  "hover:text-text-primary hover:border-border-hover hover:bg-[rgba(255,255,255,0.04)]"
                )}
                onClick={() => setSelected(null)}
                id="vt-back-btn"
              >
                {vt.backToGallery}
              </button>
            </div>
          ) : (
            /* Grid view */
            <div>
              <p className="text-[0.8rem] text-text-muted mb-4">{vt.gridHint}</p>
              <div className="grid grid-cols-3 gap-3">
                {PHOTOS.map((photo) => (
                  <button
                    key={photo.id}
                    id={`photo-card-${photo.id}`}
                    onClick={() => setSelected(photo.id)}
                    className="bg-transparent border-none cursor-pointer p-0"
                  >
                    <ViewTransition name={`photo-${photo.id}`}>
                      <div
                        className="rounded-[12px] aspect-square flex items-center justify-center text-[2.5rem] opacity-90 transition-[opacity,transform] duration-200 hover:opacity-100 hover:scale-[1.04]"
                        style={{ background: photo.color }}
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

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Pattern 2: Directional nav --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {vt.p2Label}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{vt.p2Title}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: vt.p2Desc }} />

        {/* Key insight box */}
        <div className="bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] rounded-lg px-5 py-4 mb-4 text-[0.875rem]">
          <strong className="text-text-accent">{vt.insightTitle}</strong>{" "}
          <span
            className="text-(--color-text-secondary)"
            dangerouslySetInnerHTML={{ __html: vt.insightText }}
          />
        </div>

        <CodeBlock code={NAV_CODE} filename="app/photo/[id]/page.tsx" language="tsx" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Pattern 3: CSS keyframes summary --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {vt.p3Label}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{vt.p3Title}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: vt.p3Desc }} />
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
      <section className="mt-10">
        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
          {(["✅", "⚡", "🎨", "🛡️"] as const).map((icon, i) => (
            <div
              key={i}
              className="bg-bg-surface border border-border-subtle rounded-lg p-4 text-[0.875rem] text-(--color-text-secondary) flex gap-2"
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
