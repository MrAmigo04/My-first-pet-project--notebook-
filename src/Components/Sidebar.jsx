import React from 'react';

function Sidebar({ notes, activeNoteId, setActiveNoteId, createNewNote, deleteNote, searchQuery, setSearchQuery }) {
    return (
        <div className="sidebar">
            {/* Поле поиска без флекс-оберток, просто элемент списка */}
            <div style={{ padding: '10px 15px 5px 15px' }}>
                <input
                    type="text"
                    placeholder="🔍 Поиск заметок..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #ccc',
                        backgroundColor: '#fff',
                        fontSize: '0.85rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                    }}
                />
            </div>

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
