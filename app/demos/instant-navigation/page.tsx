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
    <div
      style={{
        background: "rgba(16, 185, 129, 0.1)",
        border: "1px solid rgba(16, 185, 129, 0.3)",
        borderRadius: "var(--radius-sm)",
        padding: "0.875rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        fontSize: "0.875rem",
        color: "var(--accent-green)",
      }}
    >
      <span>✅</span>
      <span>
        <strong>{label}</strong>
      </span>
    </div>
  );
}

function SuspenseFallback({ text }: { text: string }) {
  return (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)",
        padding: "0.875rem 1rem",
        fontSize: "0.875rem",
        color: "var(--text-muted)",
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
      }}
    >
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
