import { Note } from '../types/Notes';

interface NoteCardProps {
  note: Note;
  onEdit?: (note: Note) => void;
  onDelete?: (note: Note) => void;
}

export default function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <h2>{note.title}</h2>

      {note.sections.map((section, index) => (
        <div key={index} className="note-section">
          <h4>{section.label}</h4>
          <pre>{section.content}</pre>
        </div>
      ))}

      <div className="note-actions">
        <button className="edit-btn" onClick={() => onEdit?.(note)}>Editar</button>
        <button className="delete-btn" onClick={() => onDelete?.(note)}>Excluir</button>
      </div>
    </div>
  );
}
