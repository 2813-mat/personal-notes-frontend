export interface NoteSection {
  label: string;
  content: string;
}

export interface Note {
  id: string;
  title: string;
  sections: NoteSection[];
  createdAt: string;
}
