import { Suspense } from "react";
import { getNotes } from "./actions";
import ServerActionsContent from "./ServerActionsContent";

export const metadata = {
  title: "Server Actions — dev-radar",
};

// ============================================================
// Server Component — NoteList (stays server-side)
// ============================================================
async function NoteList() {
  const notes = await getNotes();
  return (
    <div style={{ marginTop: "0.5rem" }}>
      {notes.length === 0 && (
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>—</p>
      )}
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "1rem",
            padding: "0.875rem 1rem",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "var(--radius-sm)",
            marginBottom: "0.5rem",
          }}
        >
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-primary)" }}>
              {note.text}
            </p>
            <time
              style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
            >
              {new Date(note.updatedAt).toLocaleTimeString()}
            </time>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// Server page — passes NoteList as children to client shell
// ============================================================
export default function ServerActionsDemo() {
  return (
    <ServerActionsContent
      noteList={
        <Suspense
          fallback={
            <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
              ...
            </p>
          }
        >
          <NoteList />
        </Suspense>
      }
    />
  );
}
