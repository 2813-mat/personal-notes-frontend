import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { useAuth } from '../context/AuthContext';

export default function Notes() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleNoteAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <header className="app-header">
        <span className="app-title">Nossas Notas</span>
        <button className="logout-btn" onClick={handleLogout}>Sair</button>
      </header>

      <div className="container">
        <NoteForm onNoteAdded={handleNoteAdded} />
        <NoteList refreshKey={refreshKey} />
      </div>
    </div>
  );
}
