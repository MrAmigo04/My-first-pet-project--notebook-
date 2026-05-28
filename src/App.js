import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';

import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Notebook from './pages/Notebook';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
  const [quote, setQuote] = useState('Загрузка вдохновения...');
  const [searchQuery, setSearchQuery] = useState('');

  // Инициализация темы
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('notebook-dark-mode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Инициализация заметок
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

  // Инициализация активной заметки
  const [activeNoteId, setActiveNoteId] = useState(() => {
    const savedActiveId = localStorage.getItem('notebook-text-active-id-v2');
    return savedActiveId ? JSON.parse(savedActiveId) : 1;
  });

  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Безопасный поиск активной заметки. Если массив пуст — вернет пустой объект, а не завалит приложение
  const activeNote = notes.find(note => note.id === activeNoteId) || notes[0] || {};

  // Фильтрация заметок по поиску на верхнем уровне
  const filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Синхронизация с localStorage
  useEffect(() => {
    localStorage.setItem('notebook-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('notebook-text-data-v2', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('notebook-text-active-id-v2', JSON.stringify(activeNoteId));
  }, [activeNoteId]);

  // Загрузка цитат
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

    if (!window.confirm("⚠️ Вы уверены, что хотите навсегда удалить эту заметку?")) {
      return;
    }

    const filteredNotesList = notes.filter(note => note.id !== noteId);

    if (activeNoteId === noteId) {
      const remainingNote = notes.find(note => note.id !== noteId);
      setActiveNoteId(remainingNote.id);
    }

    setNotes(filteredNotesList);
  };

  // Универсальный DRY-метод обновления полей
  const updateActiveNote = (fieldsToUpdate) => {
    if (!activeNote.id) return; // Защита, если заметок нет
    setNotes(prevNotes =>
        prevNotes.map(note =>
            note.id === activeNote.id ? { ...note, ...fieldsToUpdate } : note
        )
    );
  };

  const handleToggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
      <Router>
        <div
            className={`app-main-wrapper ${darkMode ? 'dark-theme' : ''}`}
            style={{ '--active-note-color': activeNote.color || '#8b5a2b' }}
        >
          <Navbar />
          <div className="main-content-area">
            <Routes>
              <Route path="/" element={<Home quote={quote} onRefreshQuote={fetchQuote} />} />
              <Route
                  path="/notebook"
                  element={
                    <Notebook
                        notes={filteredNotes}
                        activeNoteId={activeNoteId}
                        setActiveNoteId={setActiveNoteId}
                        createNewNote={createNewNote}
                        deleteNote={deleteNote}
                        activeNote={activeNote}
                        isEditingTitle={isEditingTitle}
                        setIsEditingTitle={setIsEditingTitle}
                        updateActiveNote={updateActiveNote}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />
                  }
              />
              <Route path="/analytics" element={<Analytics notes={notes} darkMode={darkMode} />} />
              <Route path="/settings" element={<Settings darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;