import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { countWords } from '../Utils/textUtils';

import { NOTE_COLORS } from '../constants/noteColors';

function Notebook({ notes, activeNoteId, setActiveNoteId, createNewNote, deleteNote, activeNote, isEditingTitle, setIsEditingTitle, handleTitleChange, handleColorChange, handleTextChange }) {
    // 1. Создаем стейт для хранения текста поиска
    const [searchQuery, setSearchQuery] = useState('');

    // 2. Фильтруем заметки по заголовку (приводим к нижнему регистру для точности)
    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="notebook-page-layout">
            {/* Оборачиваем сайдбар в контейнер и добавляем поле поиска сверху */}
            <div className="sidebar-search-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input
                    type="text"
                    placeholder="🔍 Поиск заметок..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        margin: '15px 15px 0 15px',
                        padding: '10px 15px',
                        borderRadius: '8px',
                        border: '1px solid #ddd',
                        backgroundColor: '#fcfaf7',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
                        transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--active-note-color, #8b5a2b)'}
                    onBlur={(e) => e.target.style.borderColor = '#ddd'}
                />

                {/* Передаем в Sidebar уже отфильтрованный массив filteredNotes вместо исходного notes */}
                <Sidebar
                    notes={filteredNotes}
                    activeNoteId={activeNoteId}
                    setActiveNoteId={setActiveNoteId}
                    createNewNote={createNewNote}
                    deleteNote={deleteNote}
                />
            </div>

            <div className="notebook-cover">
                <div className="leather-texture"></div>
                <div className="notebook-rings">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="ring"></div>)}
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
                            <h1 className="title" onClick={() => setIsEditingTitle(true)}>
                                {activeNote.title} ✏️
                            </h1>
                        )}
                    </div>
                    <div className="char-counter">
                        Символов: {activeNote.text.length} | Слов: {countWords(activeNote.text)}
                    </div>
                    <textarea
                        className="notebook-editor"
                        placeholder="Начни писать свои мысли здесь..."
                        value={activeNote.text}
                        onChange={(e) => handleTextChange(e.target.value)}
                    />
                </div>
            </div>
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

export default Notebook;
