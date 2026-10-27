"use client";

import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import { useT } from "@/lib/i18n/context";
import type { ReactNode } from "react";

const WHAT_IS_INSTANT_CODE = `// A navigation is INSTANT when:
// ✅ Static + cached content appears immediately on click
// ✅ Server streams remaining (dynamic) content into Suspense fallbacks
// ✅ Layout is not re-fetched (only the changed part re-renders)

// Two paths to the same page:
// 1. Direct visit (page load)  → gets full HTML from CDN
// 2. Client navigation (Link)  → only re-renders below shared layout

// The key: Suspense boundaries below the shared layout`;

const PRODUCT_PAGE_CODE = `// app/store/[slug]/page.tsx
// ✅ This page navigates instantly because:
// - ProductInfo is cached with 'use cache'
// - Inventory is wrapped in Suspense (streams in)
// - Neither blocks the page from showing immediately

import { Suspense } from 'react'

export default function ProductPage(props: PageProps<'/store/[slug]'>) {
  return (
    <div>
      <Suspense fallback={<p>Loading product...</p>}>
        <ProductInfo params={props.params} />   {/* cached → instant */}
      </Suspense>
      <Suspense fallback={<p>Checking availability...</p>}>
        <Inventory params={props.params} />     {/* fresh → streams in */}
      </Suspense>
    </div>
  )
}

async function getProduct(slug: string) {
  'use cache'                                  // ← makes it instant
  cacheLife('hours')
  return db.products.findBySlug(slug)
}

async function ProductInfo({ params }) {
  const { slug } = await params               // ← async params (Next 16)
  const product = await getProduct(slug)       // ← hits cache
  return <h1>{product.name}</h1>
}

async function Inventory({ params }) {
  const { slug } = await params
  const item = await db.inventory.findBySlug(slug)  // ← always fresh
  return <p>{item.count} in stock</p>
}`;

const BLOCKING_FIX_CODE = `// ❌ BLOCKING: fetches at top level block the page
export default async function ProductPage(props) {
  const featured = await getFeatured()  // blocks if uncached!
  const { slug } = await props.params  // suspends
  const product = await fetch(...)     // also blocks
  // ...
}

// ✅ FIX 1: Move slug-dependent work into Suspense
export default async function ProductPage(props) {
  const featured = await getFeatured()  // still here, but we'll fix this too
  return (
    <div>
      <FeaturedSection items={featured} />
      <Suspense fallback={<p>Loading product...</p>}>
        <ProductInfo params={props.params} />
      </Suspense>
    </div>
  )
}

// ✅ FIX 2: Cache the featured fetch
async function getFeatured() {
  'use cache'         // ← now it's part of the static shell!
  cacheLife('hours')
  return fetch('https://api.example.com/featured').then(r => r.json())
}`;

const INSTANT_EXPORT_CODE = `// Opt-out: not every page needs to be instant
// Set instant = false to suppress validation warnings

// app/dashboard/layout.tsx
export const instant = false  // ← opt this segment out

// With false on /dashboard/layout.tsx:
// - Navigations into /dashboard from outside are not validated
// - But navigations between /dashboard/a and /dashboard/b still are!`;

const LINK_PREFETCH_CODE = `// Partial Prefetching (PPR): enabled automatically with cacheComponents

// Default: prefetches App Shell (lightweight, free)
<Link href="/checkout">Checkout</Link>

// Eager: also prefetch page content alongside shell
<Link href="/checkout" prefetch>
  Checkout
</Link>

// With prefetch={true}: also opts into Runtime Prefetching
// → resolves per-link URL data (params, searchParams) ahead of click`;

interface InstantNavContentProps {
  fastComponent: ReactNode;
  slowComponent: ReactNode;
}

export default function InstantNavContent({ fastComponent, slowComponent }: InstantNavContentProps) {
  const { t } = useT();
  const nav = t.instantNav;

  return (
    <DemoLayout
      title={nav.title}
      subtitle={nav.subtitle}
      description={nav.description}
      tags={[
        { label: "Next.js 16", type: "next" },
        { label: "Cache Components", type: "new" },
        { label: "Suspense", type: "stable" },
        { label: "PPR", type: "stable" },
      ]}
      docsUrl="https://nextjs.org/docs/app/guides/instant-navigation"
    >
      {/* --- What is instant --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {nav.conceptLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{nav.conceptTitle}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: nav.conceptDesc }} />
        <CodeBlock code={WHAT_IS_INSTANT_CODE} filename="concept.ts" language="ts" />

        {/* Two paths diagram */}
        <div className="grid grid-cols-2 gap-4 mt-5">
          {[nav.directVisit, nav.clientNav].map((item) => (
            <div
              key={item.label}
              className="bg-bg-surface rounded-lg p-5"
              style={{ border: `1px solid var(--color-accent-cyan)30` }}
            >
              <div className="text-[1.5rem] mb-2">{item.icon}</div>
              <div className="font-bold text-[0.9rem] text-accent-cyan mb-1.5">{item.label}</div>
              <p className="text-[0.8rem] m-0">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Live streaming demo --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {nav.demoLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{nav.demoTitle}</h2>
        <p className="mb-6">{nav.demoDesc}</p>

        <div className="bg-bg-surface border border-border-card rounded-[12px] p-8 my-6 flex flex-col gap-3">
          <div className="text-[0.8rem] text-text-muted mb-1">{nav.streamingStatus}</div>
          {fastComponent}
          {slowComponent}
        </div>
        <p className="text-[0.8rem] text-text-muted mt-3">
          ✅ {nav.streamNote}
        </p>
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Product page pattern --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {nav.patternLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{nav.patternTitle}</h2>
        <CodeBlock code={PRODUCT_PAGE_CODE} filename="app/store/[slug]/page.tsx" language="tsx" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Fixing blocking --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {nav.fixLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{nav.fixTitle}</h2>
        <p className="mb-4">{nav.fixDesc}</p>
        <CodeBlock code={BLOCKING_FIX_CODE} filename="app/products/[slug]/page.tsx" language="tsx" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Link prefetching & opt-out --- */}
      <section className="mt-10">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
              {nav.prefetchLabel}
            </div>
            <h2 className="text-[1.2rem] font-bold mb-3 text-text-primary">{nav.prefetchTitle}</h2>
            <CodeBlock code={LINK_PREFETCH_CODE} filename="components/nav.tsx" language="tsx" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
              {nav.optoutLabel}
            </div>
            <h2 className="text-[1.2rem] font-bold mb-3 text-text-primary">{nav.optoutTitle}</h2>
            <CodeBlock code={INSTANT_EXPORT_CODE} filename="app/dashboard/layout.tsx" language="tsx" />
          </div>
        </div>
      </section>
    </DemoLayout>
  );
}
