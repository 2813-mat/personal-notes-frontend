import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { useState } from 'react';

export default function Notes() {
  const [refresh, setRefresh] = useState(0);

  const handleNoteAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="container">
      <h1>Minhas Notas</h1>
      <NoteForm onNoteAdded={handleNoteAdded} />
      <NoteList onNotesUpdated={() => refresh} />
    </div>
  );
}
