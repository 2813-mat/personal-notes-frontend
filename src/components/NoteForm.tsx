import { useState } from 'react';
import { createNote } from '../api/notes';
import { NoteSection } from '../types/Notes';

interface NoteFormProps {
  onNoteAdded: () => void;
}

export default function NoteForm({ onNoteAdded }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState<NoteSection[]>([{ label: '', content: '' }]);

  const handleAddSection = () => {
    setSections([...sections, { label: '', content: '' }]);
  };

  const handleChange = (index: number, field: keyof NoteSection, value: string) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createNote({ title, sections });
    setTitle('');
    setSections([{ label: '', content: '' }]);
    onNoteAdded();
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da nota"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {sections.map((section, index) => (
        <div key={index} className="note-section">
          <input
            type="text"
            placeholder="Label"
            value={section.label}
            onChange={(e) => handleChange(index, 'label', e.target.value)}
          />
          <textarea
            placeholder="Conteúdo"
            value={section.content}
            onChange={(e) => handleChange(index, 'content', e.target.value)}
          />
        </div>
      ))}

      <div className="actions">
        <button type="button" onClick={handleAddSection}>+ Adicionar seção</button>
        <button type="submit">Salvar Nota</button>
      </div>
      
    </form>
  );
}
