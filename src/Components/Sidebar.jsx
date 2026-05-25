import React from 'react';

function Sidebar({ notes, activeNoteId, setActiveNoteId, createNewNote, deleteNote }) {
    return (
        <div className="sidebar">
            <button onClick={createNewNote} className="add-note-button">
                + Новая заметка
            </button>
            <div className="notes-list">
                {notes.map(note => (
                    <div
                        key={note.id}
                        className={`sidebar-note-item ${note.id === activeNoteId ? 'active' : ''}`}
                        style={note.id === activeNoteId ? { backgroundColor: note.color, borderColor: note.color } : {}}
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
    );
}

export default Sidebar;
