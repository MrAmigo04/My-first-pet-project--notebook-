import React from 'react';

function Analytics({ notes }) {
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

    // Общий стиль для левой рамки с использованием CSS-переменной активного цвета
    const cardStyle = {
        background: '#fcfaf7',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
        borderLeft: '5px solid var(--active-note-color, #8b5a2b)' // Динамический цвет здесь!
    };

    const numberStyle = {
        fontSize: '2rem',
        margin: '0 0 5px 0',
        color: 'var(--active-note-color, #8b5a2b)' // И здесь для цифр!
    };

    return (
        <div className="page-content analytics-page" style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '10px' }}>📊 Аналитика твоего блокнота</h2>
            <p style={{ color: '#666', marginBottom: '25px' }}>Полный разбор твоего рабочего пространства в цифрах:</p>

            <div
                className="analytics-grid"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px',
                    marginBottom: '30px'
                }}
            >
                <div style={cardStyle}>
                    <h3 style={numberStyle}>{totalNotes}</h3>
                    <p style={{ margin: 0, color: '#555', fontWeight: '500' }}>Всего заметок</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={numberStyle}>{totalWords}</h3>
                    <p style={{ margin: 0, color: '#555', fontWeight: '500' }}>Слов написано</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={numberStyle}>{totalChars}</h3>
                    <p style={{ margin: 0, color: '#555', fontWeight: '500' }}>Всего символов</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={numberStyle}>{totalDigits}</h3>
                    <p style={{ margin: 0, color: '#555', fontWeight: '500' }}>Цифр использовано</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
