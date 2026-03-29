import { useEffect, useState } from 'react';
import { getNotes, deleteNote } from '../api/notes';
import NoteCard from './NoteCard';
import { Note } from '../types/Notes';

interface NoteListProps {
  refreshKey: number;
}

export default function NoteList({ refreshKey }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getNotes();
      setNotes(data);
    } catch {
      setError('Erro ao carregar notas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [refreshKey]);

  const handleDeleted = async (id: string) => {
    if (!window.confirm('Excluir esta nota?')) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      alert('Erro ao excluir nota. Tente novamente.');
    }
  };

  const handleUpdated = (updated: Note) => {
    setNotes((prev) => prev.map((n) => (n._id === updated._id ? updated : n)));
  };

  if (loading) {
    return <p style={{ textAlign: 'center', color: '#888', marginTop: '32px' }}>Carregando notas...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', color: '#c62828', marginTop: '32px' }}>{error}</p>;
  }

  if (notes.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#888', marginTop: '32px' }}>
        Nenhuma nota ainda. Crie a primeira!
      </p>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onDeleted={handleDeleted}
          onUpdated={handleUpdated}
        />
      ))}
    </div>
  );
}
