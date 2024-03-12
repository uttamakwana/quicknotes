import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { NewNote, NoteLayout, NoteList } from "./pages";
import { useLocalStorage } from "./hooks/useLocalStorage";
import type { NoteData, RowNote, Tag } from "./types/Note";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";
import { EditNote, Note } from "./components";

export default function App() {
  const [notes, setNotes] = useLocalStorage<RowNote[]>("your-notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("your-tags", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes((prevNotes) => {
      return prevNotes.filter((n) => n.id !== id);
    });
  }

  function addTags(tag: Tag) {
    setTags((prevTags) => [...prevTags, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags((prevTags) => {
      return prevTags.map((prev) => {
        if (prev.id === id) {
          return { ...prev, label };
        } else {
          return prev;
        }
      });
    });
  }

  function deleteTag(id: string) {
    setTags((prevTags) => {
      return prevTags.filter((prev) => prev.id !== id);
    });
  }
  return (
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <NoteList
              notesWithTags={notesWithTags}
              availableTags={tags}
              updateTag={updateTag}
              deleteTag={deleteTag}
            />
          }
        />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={addTags}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path="edit"
            element={
              <EditNote
                onSubmit={onUpdateNote}
                onAddTag={addTags}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Container>
  );
}
