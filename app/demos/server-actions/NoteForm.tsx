"use client";

import { useActionState } from "react";
import { addNote } from "./actions";
import { useT } from "@/lib/i18n/context";

type NoteActionState = { error?: string } | null;

function addNoteAction(prev: NoteActionState, formData: FormData): Promise<NoteActionState> {
  return addNote(formData).then(() => null).catch((e) => ({ error: String(e) }));
}

export default function NoteForm() {
  const [state, formAction, isPending] = useActionState(addNoteAction, null);
  const { t } = useT();
  const sa = t.serverActions;

  return (
    <form action={formAction} style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-secondary)" }}>
        {sa.noteLabel}
      </label>
      <div style={{ display: "flex", gap: "0.75rem" }}>
        <input
          name="text"
          type="text"
          placeholder={sa.notePlaceholder}
          required
          disabled={isPending}
          style={{ flex: 1 }}
          id="note-input"
        />
        <button
          type="submit"
          className="btn-primary"
          disabled={isPending}
          id="add-note-btn"
          style={{ whiteSpace: "nowrap" }}
        >
          {isPending ? sa.addingBtn : `+ ${sa.addBtn}`}
        </button>
      </div>
      {state?.error && (
        <p style={{ color: "#ef4444", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          {state.error}
        </p>
      )}
      <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
        ↑ {sa.formHint}
      </p>
    </form>
  );
}
