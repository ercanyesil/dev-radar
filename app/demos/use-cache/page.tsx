import { Suspense } from "react";
import { cacheLife, cacheTag } from "next/cache";
import UseCacheContent from "./UseCacheContent";

export const metadata = {
  title: "use cache Directive — dev-radar",
};

// ============================================================
// Server Components — stay server-side with real 'use cache'
// ============================================================

async function getCachedTime() {
  "use cache";
  cacheLife("seconds");
  cacheTag("demo-time");
  await new Promise((r) => setTimeout(r, 50));
  return new Date().toISOString();
}

async function getExpensiveData() {
  "use cache";
  cacheLife("hours");
  cacheTag("expensive-data");
  await new Promise((r) => setTimeout(r, 80));
  return {
    posts: 142,
    users: 37,
    revenue: "$12,840",
    fetchedAt: new Date().toISOString(),
  };
}

async function CachedTimestamp() {
  const time = await getCachedTime();
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "1rem 1.25rem",
        fontFamily: "var(--font-mono)",
        fontSize: "0.875rem",
      }}
    >
      <div style={{ color: "var(--text-muted)", fontSize: "0.7rem", marginBottom: "0.25rem" }}>
        getCachedTime() — cacheLife(&apos;seconds&apos;)
      </div>
      <div style={{ color: "var(--accent-green)", fontWeight: 600 }}>
        ✅ Cached: {time}
      </div>
      <div style={{ color: "var(--text-muted)", fontSize: "0.75rem", marginTop: "0.25rem" }}>
        Reload the page — this value is cached for ~1 second server-side.
      </div>
    </div>
  );
}

async function CachedDashboard() {
  const data = await getExpensiveData();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
      {[
        { label: "Posts", value: data.posts, icon: "📝" },
        { label: "Users", value: data.users, icon: "👤" },
        { label: "Revenue", value: data.revenue, icon: "💰" },
      ].map((item) => (
        <div
          key={item.label}
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            padding: "1rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.25rem" }}>{item.icon}</div>
          <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--text-primary)" }}>
            {item.value}
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{item.label}</div>
        </div>
      ))}
      <div
        style={{
          gridColumn: "1 / -1",
          fontSize: "0.7rem",
          fontFamily: "var(--font-mono)",
          color: "var(--text-muted)",
          textAlign: "center",
          paddingTop: "0.25rem",
        }}
      >
        cacheLife(&apos;hours&apos;) · fetchedAt: {data.fetchedAt}
      </div>
    </div>
  );
}

// ============================================================
// Server page — passes server components as children to client shell
// ============================================================
export default function UseCacheDemo() {
  return (
    <UseCacheContent
      cachedTimestamp={
        <Suspense
          fallback={
            <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              ⏳ ...
            </div>
          }
        >
          <CachedTimestamp />
        </Suspense>
      }
      cachedDashboard={
        <Suspense
          fallback={
            <div style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
              ⏳ ...
            </div>
          }
        >
          <CachedDashboard />
        </Suspense>
      }
    />
  );
}
