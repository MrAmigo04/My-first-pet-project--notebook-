import { useState, useEffect } from 'react';
import './App.css';

// Палитра благородных кожаных оттенков: Коричневый, Изумрудный, Бордовый, Темно-синий, Горчичный, Графитовый
const NOTE_COLORS = ['#8b5a2b', '#1e4620', '#6b1d1d', '#1f3a60', '#b7791f', '#2d3748'];

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notebook-text-data-v2');
    return savedNotes ? JSON.parse(savedNotes) : [
      {
        id: 1,
        title: 'Моя первая заметка',
        color: '#8b5a2b', // Стартовый красивый коричневый
        text: 'Привет! Это твой обновленный блокнот.\n\nТеперь выбор цвета полностью меняет кожаную текстуру обложки и активные элементы.\n\nСправа на деревянном столе лежит твой верный карандаш. Пиши свои мысли свободно!'
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

  const activeNote = notes.find(note => note.id === activeNoteId) || notes;

  useEffect(() => {
    if (notes.length > 0 && !notes.some(n => n.id === activeNoteId)) {
      setActiveNoteId(notes.id);
    }
  }, [notes, activeNoteId]);

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
      // Передаем выбранный цвет как CSS-переменную на весь контейнер
      <div className="app-container" style={{ '--active-note-color': activeNote.color }}>

        {/* Деревянный стол (фоновая текстура) */}
        <div className="wooden-table-overlay"></div>

        {/* Боковая панель */}
        <div className="sidebar">
          <button onClick={createNewNote} className="add-note-button">
            + Новая заметка
          </button>
          <div className="notes-list">
            {notes.map(note => (
                <div
                    key={note.id}
                    className={`sidebar-note-item ${note.id === activeNote.id ? 'active' : ''}`}
                    style={note.id === activeNote.id ? { backgroundColor: note.color, borderColor: note.color } : {}}
                    onClick={() => setActiveNoteId(note.id)}
                >
                  <div className="sidebar-note-left">
                    <span className="note-color-badge" style={{ backgroundColor: note.color }}></span>
                    <span className="sidebar-note-title">{note.title}</span>
                  </div>
                  <button onClick={(e) => deleteNote(note.id, e)} className="sidebar-delete-note">
                    ✕
                  </button>
                </div>
            ))}
          </div>
        </div>

        {/* Обложка блокнота */}
        <div className="notebook-cover">
          {/* Кожаная текстура поверх цвета */}
          <div className="leather-texture"></div>

          <div className="notebook-rings">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="ring"></div>
          </div>

          <div className="notebook">
            <div className="paper-texture"></div>

            <div className="title-container">
              {isEditingTitle ? (
                  <div className="title-edit-zone">
                    <input
                        type="text"
                        value={activeNote.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        onBlur={() => setTimeout(() => setIsEditingTitle(false), 200)}
                        onKeyDown={(e) => e.key === 'Enter' && setIsEditingTitle(false)}
                        className="title-input"
                        autoFocus
                    />
                    <div className="color-picker">
                      {NOTE_COLORS.map(color => (
                          <button
                              key={color}
                              className={`color-dot ${activeNote.color === color ? 'selected' : ''}`}
                              style={{ backgroundColor: color }}
                              onClick={() => handleColorChange(color)}
                          />
                      ))}
                    </div>
                  </div>
              ) : (
                  <h1 className="title" onClick={() => setIsEditingTitle(true)} title="Кликни для изменения">
                    {activeNote.title} ✏️
                  </h1>
              )}
            </div>

            <textarea
                className="notebook-editor"
                placeholder="Начни писать свои мысли здесь..."
                value={activeNote.text}
                onChange={(e) => handleTextChange(e.target.value)}
            />
          </div>
        </div>

        {/* Реалистичный 3D-карандаш на столе */}
        <div className="desk-pencil">
          <div className="pencil-tip"></div>
          <div className="pencil-wood"></div>
          <div className="pencil-body"></div>
          <div className="pencil-eraser-gold"></div>
          <div className="pencil-eraser"></div>
        </div>

      </div>
  );
}

export default App;
