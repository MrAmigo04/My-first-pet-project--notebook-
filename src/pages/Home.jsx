import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="page-content home-page">
            <h1>Добро пожаловать в Твой Личный Кабинет 📝</h1>
            <p>Это не просто блокнот, а полноценное рабочее пространство для твоих мыслей, планов и творчества.</p>
            <div className="home-buttons">
                <Link to="/notebook" className="nav-btn primary">Открыть блокнот ➡️</Link>
            </div>
        </div>
    );
}

export default Home;
