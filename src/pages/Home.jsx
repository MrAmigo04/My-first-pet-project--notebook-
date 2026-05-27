import React from 'react';
import { Link } from 'react-router-dom';

function Home({ quote, onRefreshQuote }) {
    return (
        <div className="page-content home-page">
            <h1>Добро пожаловать в Твой Личный Кабинет 🏠</h1>

            {/* Красивый блок для цитаты дня */}
            <div className="daily-quote-box" style={{ fontStyle: 'italic', margin: '25px 0', color: '#552200', padding: '15px', borderLeft: '4px solid var(--active-note-color, #8b5a2b)' }}>
                {quote}
            </div>

            <p>Это не просто блокнот, а полноценное рабочее пространство для твоих мыслей, планов и творчества.</p>

            <div className="home-buttons" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <Link to="/notebook" className="nav-btn primary">Открыть блокнот 📝</Link>

                {/* Стабильная стильная кнопка для обновления цитаты */}
                <button
                    onClick={onRefreshQuote}
                    className="nav-btn"
                    style={{
                        backgroundColor: '#8b5a2b',
                        color: '#ffffff',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#6d4520'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#8b5a2b'}
                >
                    Получить новую цитату ✨
                </button>
            </div>
        </div>
    );
}

export default Home;
