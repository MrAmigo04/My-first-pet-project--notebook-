import React from 'react';

function Analytics({ notes }) {
    const totalNotes = notes.length;
    const totalChars = notes.reduce((sum, note) => sum + note.text.length, 0);

    return (
        <div className="page-content">
            <h2>📊 Аналитика твоего блокнота</h2>
            <p>Твои успехи в цифрах:</p>
            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3>{totalNotes}</h3>
                    <p>Всего заметок</p>
                </div>
                <div className="analytics-card">
                    <h3>{totalChars}</h3>
                    <p>Символов написано</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
