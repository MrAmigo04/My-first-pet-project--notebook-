import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { countWords } from '../Utils/textUtils';

import { NOTE_COLORS } from '../constants/noteColors';

function Notebook({ notes, activeNoteId, setActiveNoteId, createNewNote, deleteNote, activeNote, isEditingTitle, setIsEditingTitle, handleTitleChange, handleColorChange, handleTextChange }) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredNotes = notes.filter(note =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="notebook-page-layout">
            <Sidebar
                notes={filteredNotes}
                activeNoteId={activeNoteId}
                setActiveNoteId={setActiveNoteId}
                createNewNote={createNewNote}
                deleteNote={deleteNote}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* Задаем фиксированную высоту обложке, чтобы линии тетради никогда не съезжали */}
            <div className="notebook-cover" style={{ minHeight: '836px', height: '836px' }}>
                <div className="leather-texture"></div>
                <div className="notebook-rings">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="ring"></div>)}
                </div>
                <div className="notebook" style={{ minHeight: 'calc(836px - 50px)', height: 'calc(836px - 50px)' }}>
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

                    {/* Добавили стиль сдвига вверх, чтобы текст попал ровно на верхнюю строчку */}
                    <textarea
                        className="notebook-editor"
                        placeholder="Начни писать свои мысли здесь..."
                        value={activeNote.text}
                        onChange={(e) => handleTextChange(e.target.value)}
                        style={{ marginTop: '-12px' }}
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
