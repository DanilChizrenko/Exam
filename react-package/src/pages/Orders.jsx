import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import noOrdersImg from '../assets/alerts/non-orders.png';


const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('orders');
    if (stored) {
      setOrders(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="page-section orders-page">
      <Link to="/" className="back-button">← На главную</Link>
      <h1>Мои заказы</h1>

      {orders.length === 0 ? (
        <div className="orders-empty">
          <img src={noOrdersImg} alt="Нет заказов" className="orders-icon" />
          <h2 className="orders-title">У Вас нет заказов</h2>
          <p className="orders-subtext">Добавьте товары в корзину. Оформите хотя бы один заказ.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div className="order-card" key={order.id}>
              <h3>Заказ №{order.number}</h3>
              <p className="order-date">{order.date}</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.title} — {item.price} ₸
                  </li>
                ))}
              </ul>
              <div className="order-total">Итого: {order.total} ₸</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
