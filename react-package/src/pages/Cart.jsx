import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../assets/alerts/empty-cart.svg';
import backIcon from '../assets/icons/back.svg';



const Cart = () => {
  return (
    <div className="page-section cart-empty">
      <Link to="/" className="back-button">
        <img src={backIcon} alt="Назад" className="back-icon" />
        На главную
      </Link>

      <img
        src={emptyCartImg}
        alt="Корзина пуста"
        className="empty-cart-img"
      />

      <h2 className="cart-empty-title">Корзина пустая</h2>
      <p className="cart-empty-subtext" style={{ color: '#000000' }}>
        Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ
      </p>

    </div>
  );
};

export default Cart;
