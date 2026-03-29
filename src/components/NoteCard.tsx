import { useState } from 'react';
import { Note, NoteSection } from '../types/Notes';
import { updateNote } from '../api/notes';

interface NoteCardProps {
  note: Note;
  onDeleted: (id: string) => void;
  onUpdated: (note: Note) => void;
}

export default function NoteCard({ note, onDeleted, onUpdated }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [sections, setSections] = useState<NoteSection[]>(note.sections);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSectionChange = (index: number, field: keyof NoteSection, value: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: value };
    setSections(updated);
  };

  const handleAddSection = () => {
    setSections([...sections, { label: '', content: '' }]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setError('');
    setSaving(true);
    try {
      const updated = await updateNote(note._id, { title, sections });
      onUpdated(updated);
      setIsEditing(false);
    } catch {
      setError('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setTitle(note.title);
    setSections(note.sections);
    setIsEditing(false);
    setError('');
  };

  if (isEditing) {
    return (
      <div className="note-card">
        <input
          className="edit-title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título da nota"
        />

        {sections.map((section, index) => (
          <div key={index} className="note-section edit-section">
            <div className="edit-section-header">
              <input
                className="edit-label-input"
                value={section.label}
                onChange={(e) => handleSectionChange(index, 'label', e.target.value)}
                placeholder="Label"
              />
              <button
                type="button"
                className="remove-section-btn"
                onClick={() => handleRemoveSection(index)}
                title="Remover seção"
              >
                ✕
              </button>
            </div>
            <textarea
              className="note-section-content"
              value={section.content}
              onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
              placeholder="Conteúdo"
            />
          </div>
        ))}

        <button type="button" className="add-section-btn" onClick={handleAddSection}>
          + Adicionar seção
        </button>

        {error && <p className="card-error">{error}</p>}

        <div className="note-actions">
          <button className="edit-btn" onClick={handleSave} disabled={saving}>
            {saving ? 'Salvando...' : 'Salvar'}
          </button>
          <button className="delete-btn" onClick={handleCancelEdit} disabled={saving}>
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="note-card">
      <h2>{note.title}</h2>

      {note.sections.map((section, index) => (
        <div key={index} className="note-section">
          <h4>{section.label}</h4>
          <pre className="section-pre">{section.content}</pre>
        </div>
      ))}

      <div className="note-actions">
        <button className="edit-btn" onClick={() => setIsEditing(true)}>Editar</button>
        <button className="delete-btn" onClick={() => onDeleted(note._id)}>Excluir</button>
      </div>
    </div>
  );
}
