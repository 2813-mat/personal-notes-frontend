import { Note } from '../types/Notes';

let mockNotes: Note[] = [
  {
    id: '1',
    title: 'Compras do mês',
    sections: [
      { label: 'Geral', content: '- Arroz\n- Linguiça' },
      { label: 'Limpeza', content: '- Amaciante\n- Sabão' },
      { label: 'Sacolão', content: '- Cebola\n- Alho' },
    ],
    createdAt: new Date().toISOString(),
  },
];

export const getNotes = async (): Promise<Note[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(mockNotes), 300));
};

export const createNote = async (note: Omit<Note, 'id' | 'createdAt'>): Promise<Note> => {
  return new Promise((resolve) => {
    const newNote = {
      ...note,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };
    mockNotes.push(newNote);
    setTimeout(() => resolve(newNote), 300);
  });
};
