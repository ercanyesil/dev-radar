"use client";

import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import NoteForm from "./NoteForm";
import { useT } from "@/lib/i18n/context";
import type { ReactNode } from "react";

const ACTION_CODE = `// app/demos/server-actions/actions.ts
'use server'

import { updateTag, revalidateTag } from 'next/cache'
import { db } from '@/lib/db'

/**
 * updateTag() — read-your-writes semantics
 * Expires cache AND immediately refreshes data within the SAME request.
 * User sees their change right away.
 */
export async function updateUserProfile(userId: string, profile: Profile) {
  await db.users.update(userId, profile)
  updateTag(\`user-\${userId}\`)        // expire + refresh NOW
}

/**
 * revalidateTag() — stale-while-revalidate
 * Marks tag as stale. Users see old data while fresh data loads in background.
 * Use for content where a slight delay is acceptable (blog posts, catalogs).
 */
export async function publishPost(postId: string) {
  await db.posts.publish(postId)
  revalidateTag('posts', 'max')       // background refresh
}

/**
 * refresh() — refresh client router
 * Refreshes the RSC payload for the current route.
 */
export async function markAsRead(notificationId: string) {
  await db.notifications.markAsRead(notificationId)
  refresh()                            // re-render current route
}`;

const SINGLE_ROUNDTRIP_CODE = `// Next.js 16: action + revalidation + re-render = ONE HTTP request
// The response Flight stream carries both:
//   1. The action's return value  (consumed by useActionState)
//   2. A newly rendered RSC Payload for the current route

export async function createPost(formData: FormData) {
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  await db.post.create({
    data: { title: String(formData.get('title')), authorId: session.user.id }
  })

  updateTag('posts')   // No follow-up fetch needed — UI updates in same response!
}`;

const SECURITY_CODE = `// ✅ Every action is an untrusted entry point
// Framework provides: CSRF check, 1MB body limit, encrypted action IDs

export async function deletePost(id: string) {
  // 1. Always authenticate
  const session = await auth()
  if (!session?.user) throw new Error('Unauthorized')

  // 2. Authorize — check ownership, not just login
  const post = await db.post.findUnique({ where: { id } })
  if (post?.authorId !== session.user.id) throw new Error('Forbidden')

  // 3. Validate inputs (id could be anything)
  if (!z.string().uuid().safeParse(id).success) throw new Error('Invalid ID')

  await db.post.delete({ where: { id } })
  revalidatePath('/posts')
}`;

interface ServerActionsContentProps {
  noteList: ReactNode;
}

export default function ServerActionsContent({ noteList }: ServerActionsContentProps) {
  const { t } = useT();
  const sa = t.serverActions;

  return (
    <DemoLayout
      title={sa.title}
      subtitle={sa.subtitle}
      description={sa.description}
      tags={[
        { label: "Next.js 16", type: "next" },
        { label: "updateTag", type: "new" },
        { label: "Server Action", type: "stable" },
      ]}
      docsUrl="https://nextjs.org/docs/app/guides/server-actions"
    >
      {/* --- Interactive Demo --- */}
      <section className="demo-section">
        <div className="demo-label">{sa.liveLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {sa.liveTitle}
        </h2>
        <p style={{ marginBottom: "1.5rem" }}
          dangerouslySetInnerHTML={{ __html: sa.liveDesc }}
        />

        <div className="demo-interactive">
          <NoteForm />
          {noteList}
        </div>
      </section>

      <div className="divider" />

      {/* --- Key API comparison --- */}
      <section className="demo-section">
        <div className="demo-label">{sa.compLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {sa.compTitle}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          {sa.comparison.map((item, i) => {
            const colors = [
              "var(--accent-green)",
              "var(--accent-amber)",
              "var(--accent-cyan)",
            ];
            const color = colors[i] ?? "var(--accent-primary)";
            return (
              <div
                key={item.fn}
                style={{
                  background: "var(--bg-surface)",
                  border: `1px solid ${color}30`,
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem",
                }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
                <code
                  style={{
                    color,
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                  }}
                >
                  {item.fn}
                </code>
                <p style={{ fontSize: "0.8rem", marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  <strong style={{ color: "var(--text-primary)" }}>
                    {/* "Use when:" stays same in context */}
                    Use when:
                  </strong>{" "}
                  {item.when}
                </p>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", margin: 0 }}>
                  {item.behavior}
                </p>
              </div>
            );
          })}
        </div>

        <CodeBlock code={ACTION_CODE} filename="app/demos/server-actions/actions.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- Single roundtrip --- */}
      <section className="demo-section">
        <div className="demo-label">{sa.archLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {sa.archTitle}
        </h2>
        <p style={{ marginBottom: "1rem" }}
          dangerouslySetInnerHTML={{ __html: sa.archDesc }}
        />
        <CodeBlock code={SINGLE_ROUNDTRIP_CODE} filename="app/posts/actions.ts" language="ts" />
      </section>

      <div className="divider" />

      {/* --- Security --- */}
      <section className="demo-section">
        <div className="demo-label">{sa.secLabel}</div>
        <h2 style={{ fontSize: "1.4rem", marginBottom: "0.75rem" }}>
          {sa.secTitle}
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          {sa.secDesc}
        </p>
        <CodeBlock code={SECURITY_CODE} filename="app/posts/actions.ts" language="ts" />
      </section>
    </DemoLayout>
  );
}
