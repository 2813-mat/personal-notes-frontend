import React from 'react';
import Notes from './pages/Notes';
import { NotesProvider } from './context/NotesContext';

const App: React.FC = () => {
  return (
    <NotesProvider>
      <Notes />
    </NotesProvider>
  );
};

export default App;
