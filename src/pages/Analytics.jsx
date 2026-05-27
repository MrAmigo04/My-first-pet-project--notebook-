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

    // Проверяем, активен ли сейчас темный режим в приложении (смотрим на класс обертки)
    const isDarkActive = document.querySelector('.app-main-wrapper')?.classList.contains('dark-theme');

    // Динамические стили для идеального баланса тем
    const cardStyle = {
        flex: 1,
        backgroundColor: isDarkActive ? '#241d19' : '#fcfaf7', // Тёмный в ночном, светлый в обычном режиме
        border: isDarkActive ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid #e9ecef',
        borderLeft: '5px solid var(--active-note-color, #8b5a2b)',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
    };

    const textStyle = {
        margin: 0,
        fontWeight: '600',
        color: isDarkActive ? '#aaa' : '#555' // Светлый текст в тёмной теме, тёмный в светлой
    };

    return (
        <div className="page-content analytics-page" style={{ padding: '20px' }}>
            <h2 style={{ marginBottom: '10px' }}>📊 Аналитика твоего блокнота</h2>
            <p style={{ color: isDarkActive ? '#aaa' : '#666', marginBottom: '25px' }}>
                Полный разбор твоего рабочего пространства в цифрах:
            </p>

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
                    <h3 style={{ fontSize: '36px', margin: '0 0 10px 0', color: 'var(--active-note-color, #4a90e2)' }}>{totalNotes}</h3>
                    <p style={textStyle}>Всего заметок</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={{ fontSize: '36px', margin: '0 0 10px 0', color: 'var(--active-note-color, #4a90e2)' }}>{totalWords}</h3>
                    <p style={textStyle}>Слов написано</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={{ fontSize: '36px', margin: '0 0 10px 0', color: 'var(--active-note-color, #4a90e2)' }}>{totalChars}</h3>
                    <p style={textStyle}>Всего символов</p>
                </div>

                <div style={cardStyle}>
                    <h3 style={{ fontSize: '36px', margin: '0 0 10px 0', color: 'var(--active-note-color, #4a90e2)' }}>{totalDigits}</h3>
                    <p style={textStyle}>Цифр использовано</p>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
