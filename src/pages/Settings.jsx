import React from 'react';

function Settings() {
    return (
        <div className="page-content">
            <h2>⚙️ Настройки интерфейса</h2>
            <p>Здесь в будущем ты сможешь настроить тёмную тему сайта или поменять своё имя.</p>
            <div className="settings-mock">
                <label>
                    <input type="checkbox" /> Включить Ночной режим (Dark Mode)
                </label>
            </div>
        </div>
    );
}

export default Settings;
