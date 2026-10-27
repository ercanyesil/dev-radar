"use client";

import { useActionState } from "react";
import { addNote } from "./actions";
import { useT } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";

type NoteActionState = { error?: string } | null;

function addNoteAction(prev: NoteActionState, formData: FormData): Promise<NoteActionState> {
  return addNote(formData).then(() => null).catch((e) => ({ error: String(e) }));
}

export default function NoteForm() {
  const [state, formAction, isPending] = useActionState(addNoteAction, null);
  const { t } = useT();
  const sa = t.serverActions;

  return (
    <form action={formAction} className="mb-5">
      <label className="block mb-2 text-[0.875rem] font-semibold text-(--color-text-secondary)">
        {sa.noteLabel}
      </label>
      <div className="flex gap-3">
        <input
          name="text"
          type="text"
          placeholder={sa.notePlaceholder}
          required
          disabled={isPending}
          className="flex-1 bg-bg-base border border-border-card rounded-lg px-3.5 py-2.5 text-text-primary font-sans text-[0.9rem] outline-none transition-[border-color,box-shadow] duration-200 focus:border-[rgba(255,255,255,0.3)] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.05)]"
          id="note-input"
        />
        <button
          type="submit"
          disabled={isPending}
          id="add-note-btn"
          className={cn(
            "inline-flex items-center gap-2 px-[1.1rem] py-[0.55rem] whitespace-nowrap",
            "bg-text-primary text-bg-base",
            "border-none rounded-lg text-[0.85rem] font-semibold cursor-pointer font-sans tracking-[-0.01em]",
            "transition-[opacity,transform] duration-200 hover:opacity-[0.88] hover:-translate-y-px active:translate-y-0",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          {isPending ? sa.addingBtn : `+ ${sa.addBtn}`}
        </button>
      </div>
      {state?.error && (
        <p className="text-[#ef4444] text-[0.8rem] mt-2">{state.error}</p>
      )}
      <p className="text-[0.75rem] text-text-muted mt-2">
        ↑ {sa.formHint}
      </p>
    </form>
  );
}
