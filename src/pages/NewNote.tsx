import { NoteForm } from "../components";
import { NewNoteProps } from "../types/Note";

export default function NewNote({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">Create New Note</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
