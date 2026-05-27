import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import Navbar from './Components/Navbar';

import Home from './pages/Home';
import Notebook from './pages/Notebook';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import About from './pages/About';

import { NOTE_COLORS } from './constants/noteColors';

console.log("➡️ [RENDER] Компонент App перерисовывается прямо сейчас!");


function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notebook-text-data-v2');
    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: 1,
        title: 'Моя первая заметка',
        color: '#8b5a2b',
        text: 'Начни писать свои мысли здесь...'
      }
    ];
  });

  const [activeNoteId, setActiveNoteId] = useState(() => {
    const savedActiveId = localStorage.getItem('notebook-text-active-id-v2');
    return savedActiveId ? JSON.parse(savedActiveId) : 1;
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  useEffect(() => {
    localStorage.setItem('notebook-text-data-v2', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('notebook-text-active-id-v2', JSON.stringify(activeNoteId));
  }, [activeNoteId]);

  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0];

  useEffect(() => {
    if (notes.length > 0 && !notes.some(n => n.id === activeNoteId)) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  // Эффект сохранения заметок
  useEffect(() => {
    console.log("⚡ [EFFECT] Сработал useEffect для сохранения текста! Зависимость [notes] изменилась.");
    localStorage.setItem('notebook-text-data-v2', JSON.stringify(notes));
  }, [notes]); // [notes] — это dependency (зависимость)

// Эффект смены активной заметки
  useEffect(() => {
    console.log("⚡ [EFFECT] Сработал useEffect для смены ID заметки! Новая активная заметка:", activeNoteId);
    localStorage.setItem('notebook-text-active-id-v2', JSON.stringify(activeNoteId));
  }, [activeNoteId]); // [activeNoteId] — это dependency

  useEffect(() => {
    console.log("👶 [LIFECYCLE - MOUNT] Компонент родился! Этот код срабатывает ТОЛЬКО ОДИН РАЗ при загрузке страницы.");
  }, []); // Пустые скобки [] означают, что эффект не следит ни за какими переменными

  const createNewNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'Новая заметка',
      color: '#8b5a2b',
      text: ''
    };
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (noteId, e) => {
    e.stopPropagation();
    if (notes.length === 1) {
      alert("Нельзя удалить последнюю заметку!");
      return;
    }
    const filteredNotes = notes.filter(note => note.id !== noteId);
    if (activeNoteId === noteId) {
      const remainingNote = notes.find(note => note.id !== noteId);
      setActiveNoteId(remainingNote.id);
    }
    setNotes(filteredNotes);
  };

  const handleTitleChange = (newTitle) => {
    setNotes(notes.map(note =>
        note.id === activeNote.id ? { ...note, title: newTitle } : note
    ));
  };

  const handleColorChange = (color) => {
    setNotes(notes.map(note =>
        note.id === activeNote.id ? { ...note, color: color } : note
    ));
  };

  const handleTextChange = (newText) => {
    setNotes(notes.map(note =>
        note.id === activeNote.id ? { ...note, text: newText } : note
    ));
  };

  if (!activeNote) return null;

  return (
      <Router>
        <div className="app-main-wrapper" style={{ '--active-note-color': activeNote.color }}>
          {/* Шапка сайта видна всегда на верхнем уровне */}
          <Navbar />

          {/* Контент меняется в зависимости от ссылки */}
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                  path="/notebook"
                  element={
                    <Notebook
                        notes={notes}
                        activeNoteId={activeNoteId}
                        setActiveNoteId={setActiveNoteId}
                        createNewNote={createNewNote}
                        deleteNote={deleteNote}
                        activeNote={activeNote}
                        isEditingTitle={isEditingTitle}
                        setIsEditingTitle={setIsEditingTitle}
                        handleTitleChange={handleTitleChange}
                        NOTE_COLORS={NOTE_COLORS}
                        handleColorChange={handleColorChange}
                        handleTextChange={handleTextChange}
                    />
                  }
              />
              <Route path="/analytics" element={<Analytics notes={notes} />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
