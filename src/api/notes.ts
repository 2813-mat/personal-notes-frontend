import api from './axios';
import { Note, NoteSection } from '../types/Notes';

export const getNotes = async (): Promise<Note[]> => {
  const { data } = await api.get<Note[]>('/notes');
  return data;
};

export const createNote = async (note: { title: string; sections: NoteSection[] }): Promise<void> => {
  await api.post('/notes', note);
};

export const updateNote = async (
  id: string,
  note: { title?: string; sections?: NoteSection[] }
): Promise<Note> => {
  const { data } = await api.put<Note>(`/notes/${id}`, note);
  return data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};
