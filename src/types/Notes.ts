export interface NoteSection {
  label: string;
  content: string;
}

export interface Note {
  _id: string;
  title: string;
  sections: NoteSection[];
  createdAt: string;
}
