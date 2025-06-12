import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import nonOrdersPng from '../assets/alerts/non-favorites.png'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      navigate('/auth');
      return;
    }

    fetch(`http://localhost:4000/api/orders/get-orders/${userId}`)
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error('Ошибка загрузки заказов:', err));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    navigate('/');
  };

  return (
    <div className="page-section">
      <div className="orders-page">
        <div className="orders-header">
          <h1>Мои заказы</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Link to="/" className="nav-button">← На главную</Link>
            <button className="logout-btn" onClick={handleLogout}>Выйти</button>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <img
              src={nonOrdersPng}
              alt="Нет заказов"
              className="orders-icon"
            />
            <p className="orders-title">У вас нет заказов</p>
            <p className="orders-subtext">Добавьте товары в корзину и оформите хотя бы один заказ</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <h3>Заказ №{order.id}</h3>
                <p className="order-date">от {new Date(order.date).toLocaleString()}</p>
                <ul>
                  {order.items.map((item, i) => (
                    <li key={i}>{item.title} — {item.price} ₸</li>
                  ))}
                </ul>
                <p className="order-total">Итого: {order.total} ₸</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
