"use client";

import DemoLayout from "@/components/DemoLayout";
import CodeBlock from "@/components/CodeBlock";
import NoteForm from "./NoteForm";
import { useT } from "@/lib/i18n/context";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

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
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {sa.liveLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{sa.liveTitle}</h2>
        <p className="mb-6" dangerouslySetInnerHTML={{ __html: sa.liveDesc }} />

        <div className="bg-bg-surface border border-border-card rounded-[12px] p-8 my-6">
          <NoteForm />
          {noteList}
        </div>
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Key API comparison --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {sa.compLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{sa.compTitle}</h2>

        <div className="grid gap-4 mb-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {sa.comparison.map((item, i) => {
            const colors = [
              "var(--color-accent-green)",
              "var(--color-accent-amber)",
              "var(--color-accent-cyan)",
            ];
            const color = colors[i] ?? "var(--color-accent-primary)";
            return (
              <div
                key={item.fn}
                className="bg-bg-surface rounded-lg p-5"
                style={{ border: `1px solid ${color}30` }}
              >
                <div className="text-[1.5rem] mb-2">{item.icon}</div>
                <code
                  className="text-[0.8rem] font-bold bg-transparent border-none p-0"
                  style={{ color }}
                >
                  {item.fn}
                </code>
                <p className="text-[0.8rem] mt-2 mb-2">
                  <strong className="text-text-primary">Use when:</strong>{" "}
                  {item.when}
                </p>
                <p className="text-[0.75rem] text-text-muted m-0">{item.behavior}</p>
              </div>
            );
          })}
        </div>

        <CodeBlock code={ACTION_CODE} filename="app/demos/server-actions/actions.ts" language="ts" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Single roundtrip --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {sa.archLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{sa.archTitle}</h2>
        <p className="mb-4" dangerouslySetInnerHTML={{ __html: sa.archDesc }} />
        <CodeBlock code={SINGLE_ROUNDTRIP_CODE} filename="app/posts/actions.ts" language="ts" />
      </section>

      <div className="h-px bg-border-subtle my-10" />

      {/* --- Security --- */}
      <section className="mt-10">
        <div className="flex items-center gap-2 text-[0.72rem] font-bold tracking-widest uppercase text-text-muted mb-2 before:content-[''] before:block before:w-4 before:h-px before:bg-text-muted before:rounded-[1px]">
          {sa.secLabel}
        </div>
        <h2 className="text-[1.4rem] font-bold mb-3 text-text-primary">{sa.secTitle}</h2>
        <p className="mb-4">{sa.secDesc}</p>
        <CodeBlock code={SECURITY_CODE} filename="app/posts/actions.ts" language="ts" />
      </section>
    </DemoLayout>
  );
}
