export type Tag = {
  id: string;
  label: string;
};

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

export type RowNote = {
  id: string;
} & RowNoteData;

export type RowNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type NewNoteProps = NoteFormProps;

export type NoteListProps = {
  notesWithTags: Note[];
  availableTags: Tag[];
  updateTag: (id: string, label: string) => void;
  deleteTag: (id: string) => void;
  // notes: Note[];
};

export type SimplifiedTags = {
  id: string;
  title: string;
  tags: Tag[];
};

export type NoteLayoutProps = {
  notes: Note[];
};

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export type EditTagsModalProps = {
  availableTags: Tag[];
  show: boolean;
  handleClose: () => void;
  onUpdateTag: (id: string, label: string) => void;
  onDeleteTag: (id: string) => void;
};
