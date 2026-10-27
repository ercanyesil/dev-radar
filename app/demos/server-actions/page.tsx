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
    <div className="mt-2">
      {notes.length === 0 && (
        <p className="text-text-muted text-[0.875rem]">—</p>
      )}
      {notes.map((note) => (
        <div
          key={note.id}
          className="flex items-start justify-between gap-4 px-4 py-3.5 bg-bg-surface border border-border-subtle rounded-lg mb-2"
        >
          <div className="flex-1">
            <p className="m-0 text-[0.9rem] text-text-primary">
              {note.text}
            </p>
            <time className="text-[0.7rem] text-text-muted font-mono">
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
            <p className="text-text-muted text-[0.875rem] mt-2">
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
