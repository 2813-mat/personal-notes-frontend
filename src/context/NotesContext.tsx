import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Note } from '../types/Notes';
import { getNotes, createNote } from '../api/notes';

interface NotesContextType {
  notes: Note[];
  addNote: (note: Note) => Promise<void>;
}

export const NotesContext = createContext<NotesContextType | undefined>(undefined);

export const NotesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const addNote = async (note: Note) => {
    const newNote = await createNote(note);
    setNotes((prev) => [...prev, newNote]); // atualiza a lista
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider value={{ notes, addNote }}>
      {children}
    </NotesContext.Provider>
  );
};
