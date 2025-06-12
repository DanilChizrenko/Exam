import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // тут может быть логика авторизации
    navigate('/');
  };

  const handleRegister = () => {
    // тут может быть логика регистрации
    navigate('/');
  };

  return (
    <div className="page-section">
      <Link to="/" className="back-button">← На главную</Link>
      <h1 style={{ textAlign: 'center' }}>Вход и Регистрация</h1>
      <div className="auth-columns">
        {/* ВХОД */}
        <div className="auth-box">
          <h2>Вход</h2>
          <input type="text" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Пароль" className="auth-input" />
          <button className="auth-btn" onClick={handleLogin}>Войти</button>
          <p className="forgot-password">Забыли пароль?</p>
        </div>

        {/* РЕГИСТРАЦИЯ */}
        <div className="auth-box">
          <h2>Регистрация</h2>
          <input type="text" placeholder="Имя" className="auth-input" />
          <input type="text" placeholder="Email" className="auth-input" />
          <input type="password" placeholder="Пароль" className="auth-input" />
          <button className="auth-btn" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
