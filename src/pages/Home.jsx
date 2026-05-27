import React from 'react';
import { Link } from 'react-router-dom';

function Home({ quote }) {
    return (
        <div className="page-content home-page">
            <h1>Добро пожаловать в Твой Личный Кабинет 📝</h1>

            {/* Красивый блок для цитаты дня */}
            <div className="daily-quote-box" style={{ fontStyle: 'italic', margin: '25px 0', color: '#552200', padding: '15px', borderLeft: '4px solid var(--active-note-color, #8b5a2b)', background: 'rgba(255, 226, 179, 0.3)', borderRadius: '0 8px 8px 0' }}>
                {quote}
            </div>

            <p>Это не просто блокнот, а полноценное рабочее пространство для твоих мыслей, планов и творчества.</p>
            <div className="home-buttons">
                <Link to="/notebook" className="nav-btn primary">Открыть блокнот ➡️</Link>
            </div>
        </div>
    );
}

export default Home;
