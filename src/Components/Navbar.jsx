import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="main-navbar">
            <div className="navbar-logo">SmartNotebook 🧠</div>
            <div className="navbar-links">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>🏠 Главная</Link>
                <Link to="/notebook" className={location.pathname === '/notebook' ? 'active' : ''}>📝 Блокнот</Link>
                <Link to="/analytics" className={location.pathname === '/analytics' ? 'active' : ''}>📊 Статистика</Link>
                <Link to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>⚙️ Настройки</Link>
                <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>ℹ️ Автор</Link>
            </div>
        </nav>
    );
}

export default Navbar;
