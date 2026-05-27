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
  const [quote, setQuote] = useState('Загрузка вдохновения...');

  // 1. Создаем стейт тёмной темы с получением данных из localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('notebook-dark-mode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Инициализация заметок из localStorage
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

  // Инициализация активной заметки из localStorage
  const [activeNoteId, setActiveNoteId] = useState(() => {
    const savedActiveId = localStorage.getItem('notebook-text-active-id-v2');
    return savedActiveId ? JSON.parse(savedActiveId) : 1;
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Вычисляем активную заметку безопасным способом
  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0];

  // 2. Эффект для сохранения темы в localStorage при её изменении
  useEffect(() => {
    localStorage.setItem('notebook-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Проверка: если активная заметка была удалена, переключаемся на первую доступную
  useEffect(() => {
    if (notes.length > 0 && !notes.some(n => n.id === activeNoteId)) {
      setActiveNoteId(notes[0].id);
    }
  }, [notes, activeNoteId]);

  // Эффект сохранения заметок
  useEffect(() => {
    localStorage.setItem('notebook-text-data-v2', JSON.stringify(notes));
  }, [notes]);

  // Эффект смены активной заметки
  useEffect(() => {
    localStorage.setItem('notebook-text-active-id-v2', JSON.stringify(activeNoteId));
  }, [activeNoteId]);

  // Функция генерации случайной локальной цитаты
  const fetchQuote = () => {
    const localQuotes = [
      '"Единственный способ делать великие дела — любить то, что вы делаете." — Стив Джобс',
      '"Вчера — история, завтра — тайна, а сегодня — подарок." — Кунг-фу Панда',
      '"Логика может привести вас от пункта А к пункту Б, а воображение — куда угодно." — Альберт Эйнштейн',
      '"Не тот велик, кто никогда не падал, а тот велик, кто падал и вставал." — Конфуций',
      '"Ваше время ограничено, не тратьте его, проживая чужую жизнь." — Стив Джобс',
      '"Успех — это способность шагать от одной неудачи к другой, не теряя энтузиазма." — Уинстон Черчилль',
      '"Стремитесь не к успеху, а к ценности, которую вы создаете." — Альберт Эйнштейн',
      '"Если вы хотите вести счастливую жизнь, привяжите её к цели, а не к людям или вещам." — Альберт Эйнштейн',
      '"Лучший способ предсказать будущее — создать его." — Питер Друкер',
      '"Тот, кто победил себя — самый сильный воин." — Лао-Цзы'
    ];

    const randomIndex = Math.floor(Math.random() * localQuotes.length);
    setQuote(localQuotes[randomIndex]);
  };

  // Запрос первой цитаты при загрузке страницы
  useEffect(() => {
    fetchQuote();
  }, []);

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

  // 3. Функция переключения ночного режима
  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (!activeNote) return null;

  return (
      <Router>
        {/* Добавляем динамический класс dark-theme в зависимости от состояния стейта */}
        <div className={`app-main-wrapper ${darkMode ? 'dark-theme' : ''}`} style={{ '--active-note-color': activeNote.color }}>
          <Navbar />
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<Home quote={quote} onRefreshQuote={fetchQuote} />} />
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
              {/* Передаем пропсы darkMode и функцию handleToggleDarkMode в компонент Settings */}
              <Route path="/settings" element={<Settings darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
