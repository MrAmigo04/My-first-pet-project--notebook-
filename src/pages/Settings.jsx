import React from 'react';

function Settings({ darkMode, onToggleDarkMode }) {
    return (
        <div className="page-content">
            <h2>⚙️ Настройки интерфейса</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>Настрой внешний вид своего рабочего пространства под себя:</p>

            <div
                className="settings-item"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '15px',
                    background: '#fcfaf7',
                    borderRadius: '10px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.02)',
                    border: '1px solid #eee'
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#332211' }}>Ночной режим (Dark Mode)</span>
                    <span style={{ fontSize: '0.85rem', color: '#777' }}>Переключить интерфейс на темную цветовую палитру</span>
                </div>

                {/* Стильный круглый переключатель */}
                <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={onToggleDarkMode}
                        style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span style={{
                        position: 'absolute',
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: darkMode ? 'var(--active-note-color, #8b5a2b)' : '#ccc',
                        transition: '0.4s',
                        borderRadius: '34px',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <span style={{
                            position: 'absolute',
                            height: '18px', width: '18px',
                            left: darkMode ? '28px' : '4px',
                            bottom: '4px',
                            backgroundColor: 'white',
                            transition: '0.4s',
                            borderRadius: '50%',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                        }}></span>
                    </span>
                </label>
            </div>
        </div>
    );
}

export default Settings;
