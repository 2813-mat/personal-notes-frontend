import { useEffect, useState } from 'react';
import { getNotes } from '../api/notes';
import NoteCard from './NoteCard';
import { Note } from '../types/Notes';

interface NoteListProps {
  onNotesUpdated?: () => void;
}

export default function NoteList({ onNotesUpdated }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, [onNotesUpdated]);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={() => alert(`Editar: ${note.title}`)}
          onDelete={() => alert(`Excluir: ${note.title}`)}
        />
      ))}
    </div>
  );
}
