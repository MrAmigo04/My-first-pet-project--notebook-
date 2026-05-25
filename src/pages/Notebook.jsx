import React from 'react';
import Sidebar from '../Components/Sidebar';
import { countWords } from '../Utils/textUtils';

function Notebook({ notes, activeNoteId, setActiveNoteId, createNewNote, deleteNote, activeNote, isEditingTitle, setIsEditingTitle, handleTitleChange, NOTE_COLORS, handleColorChange, handleTextChange }) {
    return (
        <div className="notebook-page-layout">
            <Sidebar
                notes={notes}
                activeNoteId={activeNoteId}
                setActiveNoteId={setActiveNoteId}
                createNewNote={createNewNote}
                deleteNote={deleteNote}
            />
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
