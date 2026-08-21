# dev-radar

> **Next.js 16.3 · React 19.2 Feature Showcase** — August 2026

Interactive code examples of the latest Next.js and React features. Each demo shows a real working scenario with annotated code — not just hello world.

![dev-radar showcase](./public/next.svg)

## Live Demos

| Demo | Feature | Version |
|------|---------|---------|
| 🎬 [View Transitions](/demos/view-transitions) | `<ViewTransition>` shared element morph, directional nav | React 19.2 |
| ⚡ [Server Actions](/demos/server-actions) | `updateTag()`, `revalidateTag()`, `refresh()` | Next.js 16 |
| 🎯 [useEffectEvent](/demos/use-effect-event) | Extract non-reactive logic from Effects | React 19.2 |
| 🗄️ [use cache](/demos/use-cache) | `'use cache'` + `cacheLife()` + `cacheTag()` | Next.js 16 |
| 🚀 [Instant Navigation](/demos/instant-navigation) | Suspense + Cache Components + PPR | Next.js 16 |

## What's demonstrated

### React 19.2
- **`<ViewTransition>`** — Animate elements that update inside a Transition or navigation. Shared element morphing, Suspense reveals, directional slides.
- **`useEffectEvent`** — Extract non-reactive logic from Effects. Fix stale closure bugs without adding extra dependencies.

### Next.js 16
- **`updateTag()`** — New API for read-your-writes semantics. Expires cache and refreshes immediately in the same request.
- **`revalidateTag(tag, 'max')`** — Updated API (now requires second `cacheLife` profile argument).
- **`refresh()`** — Refresh client router from within a Server Action.
- **`'use cache'`** — Stable (no more `unstable_` prefix). Cache async functions with `cacheLife()` and `cacheTag()`.
- **`cacheLife()` / `cacheTag()`** — Stable cache control APIs.
- **Cache Components** (`cacheComponents: true`) — PPR successor. Validate instant navigation in dev.
- **Async params** — `params` and `searchParams` are fully async (synchronous access removed).
- **`middleware` → `proxy`** — File and function renamed.

## Tech Stack

- **Next.js 16.3.1** with Turbopack (default, no flags needed)
- **React 19.2.8**
- **TypeScript 5**
- **Tailwind CSS v4**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```
app/
├── page.tsx                        ← Hub: all demo links
├── layout.tsx
├── globals.css                     ← Design system + ViewTransition CSS
│
├── demos/
│   ├── view-transitions/page.tsx
│   ├── server-actions/
│   │   ├── page.tsx
│   │   ├── actions.ts              ← 'use server'
│   │   └── NoteForm.tsx
│   ├── use-effect-event/page.tsx
│   ├── use-cache/page.tsx
│   └── instant-navigation/page.tsx
│
components/
├── NavBar.tsx
├── DemoCard.tsx
├── DemoLayout.tsx
└── CodeBlock.tsx
```

## Key Links

- [Next.js 16 Upgrade Guide](./node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md)
- [Instant Navigation Guide](./node_modules/next/dist/docs/01-app/02-guides/instant-navigation.md)
- [View Transitions Guide](./node_modules/next/dist/docs/01-app/02-guides/view-transitions.md)
- [React 19.2 Announcement](https://react.dev/blog/2025/10/01/react-19-2)
