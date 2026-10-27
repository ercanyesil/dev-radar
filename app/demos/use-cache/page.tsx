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
    <div className="bg-bg-surface border border-border-subtle rounded-lg px-5 py-4 font-mono text-[0.875rem]">
      <div className="text-text-muted text-[0.7rem] mb-1">
        getCachedTime() — cacheLife(&apos;seconds&apos;)
      </div>
      <div className="text-accent-green font-semibold">
        ✅ Cached: {time}
      </div>
      <div className="text-text-muted text-[0.75rem] mt-1">
        Reload the page — this value is cached for ~1 second server-side.
      </div>
    </div>
  );
}

async function CachedDashboard() {
  const data = await getExpensiveData();
  return (
    <div className="grid grid-cols-3 gap-3">
      {[
        { label: "Posts", value: data.posts, icon: "📝" },
        { label: "Users", value: data.users, icon: "👤" },
        { label: "Revenue", value: data.revenue, icon: "💰" },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-bg-surface border border-border-subtle rounded-lg p-4 text-center"
        >
          <div className="text-[1.5rem] mb-1">{item.icon}</div>
          <div className="text-[1.25rem] font-bold text-text-primary">{item.value}</div>
          <div className="text-[0.75rem] text-text-muted">{item.label}</div>
        </div>
      ))}
      <div className="col-span-3 text-[0.7rem] font-mono text-text-muted text-center pt-1">
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
            <div className="text-text-muted text-[0.875rem]">⏳ ...</div>
          }
        >
          <CachedTimestamp />
        </Suspense>
      }
      cachedDashboard={
        <Suspense
          fallback={
            <div className="text-text-muted text-[0.875rem]">⏳ ...</div>
          }
        >
          <CachedDashboard />
        </Suspense>
      }
    />
  );
}
