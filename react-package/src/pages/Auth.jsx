import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();

  // Состояния для формы входа
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Состояния для формы регистрации
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Ошибка входа');
      }

      const data = await response.json();
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userName', data.name);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regPassword
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Ошибка регистрации');
      }

      const data = await response.json();
      localStorage.setItem('userId', data.id);
      localStorage.setItem('userName', data.name);
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-section">
      <Link to="/" className="back-button">← На главную</Link>
      <h1 style={{ textAlign: 'center' }}>Вход и Регистрация</h1>
      <div className="auth-columns">
        {/* Вход */}
        <div className="auth-box">
          <h2>Вход</h2>
          <input
            type="text"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="auth-input"
          />
          <button className="auth-btn" onClick={handleLogin}>Войти</button>
          <p className="forgot-password">Забыли пароль?</p>
        </div>

        {/* Регистрация */}
        <div className="auth-box">
          <h2>Регистрация</h2>
          <input
            type="text"
            placeholder="Имя"
            value={regName}
            onChange={(e) => setRegName(e.target.value)}
            className="auth-input"
          />
          <input
            type="text"
            placeholder="Email"
            value={regEmail}
            onChange={(e) => setRegEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={regPassword}
            onChange={(e) => setRegPassword(e.target.value)}
            className="auth-input"
          />
          <button className="auth-btn" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
      </div>
    </div>
  );
};

export default Auth;