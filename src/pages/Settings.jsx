import React from 'react';

function Settings({ darkMode, onToggleDarkMode }) {
    return (
        <div className="page-content">
            <h2>⚙️ Настройки интерфейса</h2>
            <p className="settings-subtitle">Настрой внешний вид своего рабочего пространства под себя:</p>

            <div className="settings-item">
                <div className="settings-text-block">
                    <span className="settings-title">Ночной режим (Dark Mode)</span>
                    <span className="settings-desc">Переключить интерфейс на темную цветовую палитру</span>
                </div>

                {/* Ультра-стильный переключатель без инлайн-стилей в JS */}
                <label className="toggle-switch">
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={onToggleDarkMode}
                    />
                    <span className="slider">
                        <span className="knob"></span>
                    </span>
                </label>
            </div>
        </div>
    );
}

export default Settings;