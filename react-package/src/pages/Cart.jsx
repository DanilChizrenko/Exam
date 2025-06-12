import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../assets/alerts/empty-cart.svg'; // ← правильный путь


const Cart = () => {
  return (
    <div className="page-section cart-empty">
      <Link to="/" className="back-button">← На главную</Link>
      <img
        src={emptyCartImg}
        alt="Корзина пуста"
        className="empty-cart-img"
      />

      <h2 className="cart-empty-title">Корзина пустая</h2>
      <p className="cart-empty-subtext">
        Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ
      </p>
    </div>
  );
};

export default Cart;
