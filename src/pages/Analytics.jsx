import React from 'react';

function Analytics({ notes, darkMode }) {
    const totalNotes = notes.length;

    let totalChars = 0;
    let totalWords = 0;
    let totalDigits = 0;

    notes.forEach(note => {
        const text = note.text || '';
        totalChars += text.length;

        const trimmedText = text.trim();
        if (trimmedText !== '') {
            const words = trimmedText.split(/\s+/);
            totalWords += words.length;
        }

        const digitsMatch = text.match(/\d/g);
        if (digitsMatch) {
            totalDigits += digitsMatch.length;
        }
    });

    return (
        <div className="page-content analytics-page">
            <h2>📊 Аналитика твоего блокнота</h2>
            <p className="analytics-subtitle">
                Полный разбор твоего рабочего пространства в цифрах:
            </p>

            <div className="analytics-grid">
                <div className="analytics-card">
                    <h3 style={{ color: 'var(--active-note-color, #4a90e2)' }}>{totalNotes}</h3>
                    <p>Всего заметок</p>
                </div>

                <div className="analytics-card">
                    <h3 style={{ color: 'var(--active-note-color, #4a90e2)' }}>{totalWords}</h3>
                    <p>Слов написано</p>
                </div>

                <div className="analytics-card">
                    <h3 style={{ color: 'var(--active-note-color, #4a90e2)' }}>{totalChars}</h3>
                    <p>Всего символов</p>
                </div>

                <div className="analytics-card">
                    <h3 style={{ color: 'var(--active-note-color, #4a90e2)' }}>{totalDigits}</h3>
                    <p>Цифр использовано</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;