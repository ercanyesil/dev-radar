import { Suspense } from "react";
import InstantNavContent from "./InstantNavContent";

export const metadata = {
  title: "Instant Navigation — dev-radar",
};

// ============================================================
// Server Component — real server-side delays for streaming demo
// ============================================================

async function SlowComponent({ delay, label }: { delay: number; label: string }) {
  await new Promise((r) => setTimeout(r, delay));
  return (
    <div className="bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.3)] rounded-lg px-4 py-3.5 flex items-center gap-2 text-[0.875rem] text-accent-green">
      <span>✅</span>
      <span>
        <strong>{label}</strong>
      </span>
    </div>
  );
}

function SuspenseFallback({ text }: { text: string }) {
  return (
    <div className="bg-bg-surface border border-border-subtle rounded-lg px-4 py-3.5 text-[0.875rem] text-text-muted flex gap-2 items-center">
      <span className="pulse">⏳</span> {text}
    </div>
  );
}

// ============================================================
// Server page — passes streaming components to client shell
// Labels are hardcoded here because Suspense fallbacks must be
// known at render time; the client shell owns translated labels.
// ============================================================
export default function InstantNavigationDemo() {
  return (
    <InstantNavContent
      fastComponent={
        <Suspense fallback={<SuspenseFallback text="Fast component loading (100ms)..." />}>
          <SlowComponent delay={100} label="Fast component (cached data) — streamed in after 100ms" />
        </Suspense>
      }
      slowComponent={
        <Suspense fallback={<SuspenseFallback text="Slow component loading (800ms)..." />}>
          <SlowComponent delay={800} label="Slow component (live inventory) — streamed in after 800ms" />
        </Suspense>
      }
    />
  );
}
