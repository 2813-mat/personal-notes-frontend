import { useState, FormEvent } from 'react';
import { createNote } from '../api/notes';
import { NoteSection } from '../types/Notes';

interface NoteFormProps {
  onNoteAdded: () => void;
}

export default function NoteForm({ onNoteAdded }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState<NoteSection[]>([{ label: '', content: '' }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSection = () => {
    setSections([...sections, { label: '', content: '' }]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, field: keyof NoteSection, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('O título é obrigatório.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await createNote({ title, sections });
      setTitle('');
      setSections([{ label: '', content: '' }]);
      onNoteAdded();
    } catch {
      setError('Erro ao criar nota. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da nota"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
      />

      {sections.map((section, index) => (
        <div key={index} className="form-section-group">
          <div className="form-section-header">
            <input
              type="text"
              placeholder="Label (ex: Frutas)"
              value={section.label}
              onChange={(e) => handleChange(index, 'label', e.target.value)}
              disabled={loading}
            />
            {sections.length > 1 && (
              <button
                type="button"
                className="remove-section-btn"
                onClick={() => handleRemoveSection(index)}
                disabled={loading}
                title="Remover seção"
              >
                ✕
              </button>
            )}
          </div>
          <textarea
            placeholder="Conteúdo"
            value={section.content}
            onChange={(e) => handleChange(index, 'content', e.target.value)}
            disabled={loading}
          />
        </div>
      ))}

      {error && <p className="form-error">{error}</p>}

      <div className="actions">
        <button type="button" onClick={handleAddSection} disabled={loading}>
          + Adicionar seção
        </button>
        <button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar Nota'}
        </button>
      </div>
    </form>
  );
}
