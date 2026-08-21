"use client";

import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import { useT } from "@/lib/i18n/context";
import type { ReactNode } from "react";

const BASIC_CACHE_CODE = `// 'use cache' — Next.js 16 stable (no unstable_ prefix needed)
// Previously: unstable_cacheLife, unstable_cacheTag
// Now:        cacheLife, cacheTag

import { cacheLife, cacheTag } from 'next/cache'

async function getPosts() {
  'use cache'                       // ← cache this function's result
  cacheLife('hours')                // stale: 1h, revalidate: 4h, expire: 8h
  cacheTag('posts')                 // tag for targeted invalidation

  const res = await fetch('https://api.example.com/posts')
  return res.json()
}`;

const CACHE_LIFE_CODE = `// Built-in cacheLife profiles:
//   'seconds' → stale: 0,   revalidate: 1,    expire: 60
//   'minutes' → stale: 60,  revalidate: 300,  expire: 3600
//   'hours'   → stale: 3600, revalidate: 14400, expire: 86400
//   'days'    → stale: 86400, revalidate: 604800, expire: 2592000
//   'weeks'   → stale: 604800, revalidate: 2592000, expire: Infinity
//   'max'     → stale: ∞,   revalidate: ∞,    expire: ∞

// Custom profile:
async function getSlowResource() {
  'use cache'
  cacheLife({
    stale: 60,        // serve stale for 1 min while revalidating
    revalidate: 300,  // background revalidation every 5 min
    expire: 3600,     // hard expire after 1 hour
  })
  cacheTag('my-resource')
  return heavyDataFetch()
}`;

const INVALIDATION_CODE = `// Tag-based invalidation in Server Actions
'use server'

import { revalidateTag, updateTag } from 'next/cache'

// revalidateTag — stale-while-revalidate (background)
export async function publishPost(id: string) {
  await db.posts.publish(id)
  revalidateTag('posts', 'max')    // background — users see stale briefly
}

// updateTag — read-your-writes (immediate)
export async function updateMyProfile(data: Profile) {
  await db.users.update(data)
  updateTag('my-profile')          // immediate — user sees change now
}`;

const USE_CACHE_PRIVATE_CODE = `// 'use cache: private' — Next.js 16
// Cache functions that read cookies() or headers()
// Result is cached in the BROWSER only, not on the server

async function getPersonalizedContent() {
  'use cache: private'          // ← variant for session-specific data
  cacheLife('minutes')
  const session = await cookies()
  return fetchDashboard(session.get('userId'))
}

// Also available:
//   'use cache: remote' — persistent across serverless instances
//   'use cache'         — in-memory, resets on restart (default)`;

interface UseCacheContentProps {
  cachedTimestamp: ReactNode;
  cachedDashboard: ReactNode;
}

export default function UseCacheContent({ cachedTimestamp, cachedDashboard }: UseCacheContentProps) {
  const { t } = useT();
  const uc = t.useCache;

  return (
    <DemoLayout
      title={uc.title}
      subtitle={uc.subtitle}
      description={uc.description}
      tags={[
        { label: "Next.js 16", type: "next" },
        { label: "cacheLife", type: "new" },
        { label: "cacheTag", type: "new" },
        { label: "Stable", type: "stable" },
      ]}
      docsUrl="https://nextjs.org/docs/app/api-reference/directives/use-cache"
    >
      {/* --- Live demo --- */}
      <section className="demo-section">
        <div className="demo-label">{uc.liveLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uc.liveTitle}
        </h2>
        <p style={{ marginBottom: "1.5rem" }}>
          {uc.liveDesc}
        </p>

        <div className="demo-interactive" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cachedTimestamp}
          {cachedDashboard}
        </div>
      </section>

      <div className="divider" />

      {/* --- Basic usage --- */}
      <section className="demo-section">
        <div className="demo-label">{uc.basicLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uc.basicTitle}
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          {uc.basicDesc}
        </p>
        <CodeBlock code={BASIC_CACHE_CODE} filename="lib/data.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- cacheLife profiles --- */}
      <section className="demo-section">
        <div className="demo-label">{uc.profilesLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uc.profilesTitle}
        </h2>
        <CodeBlock code={CACHE_LIFE_CODE} filename="lib/slow-resource.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- Invalidation --- */}
      <section className="demo-section">
        <div className="demo-label">{uc.invalidLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uc.invalidTitle}
        </h2>
        <CodeBlock code={INVALIDATION_CODE} filename="app/actions.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- Variants --- */}
      <section className="demo-section">
        <div className="demo-label">{uc.variantsLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {uc.variantsTitle}
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          {uc.variantsDesc}
        </p>
        <CodeBlock code={USE_CACHE_PRIVATE_CODE} filename="lib/personalized.ts" language="ts" />
      </section>
    </DemoLayout>
  );
}
