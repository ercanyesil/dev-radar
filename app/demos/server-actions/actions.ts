"use server";

// In-memory store (resets on server restart — good enough for a demo)
const notes: { id: string; text: string; updatedAt: string }[] = [
  { id: "1", text: "Welcome to the Server Actions demo!", updatedAt: new Date().toISOString() },
];

export async function getNotes() {
  return [...notes];
}

export async function addNote(formData: FormData) {
  const text = formData.get("text") as string;
  if (!text?.trim()) return;

  notes.push({
    id: Date.now().toString(),
    text: text.trim(),
    updatedAt: new Date().toISOString(),
  });
}

export async function deleteNote(id: string) {
  const idx = notes.findIndex((n) => n.id === id);
  if (idx !== -1) notes.splice(idx, 1);
}
