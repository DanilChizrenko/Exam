import React from 'react';
import './CartSidebar.css';
import emptyCartImg from '../assets/alerts/empty-cart.svg';
import orderSuccessImg from '../assets/alerts/success-order.svg';

const CartSidebar = ({
  isOpen,
  onClose,
  cartItems,
  onRemove,
  onOrder,
  orderPlaced,
  orderNumber
}) => {
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
  const isEmpty = cartItems.length === 0;

  return (
    <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="cart-sidebar-content">
        <h2 className="cart-title">Корзина</h2>

        {orderPlaced ? (
          <div className="cart-empty-block">
            <img src={orderSuccessImg} alt="Успешно" />
            <h3>Ваш заказ №{orderNumber}</h3>
            <p>Спасибо за заказ! Мы свяжемся с вами в ближайшее время.</p>
            <button className="cart-close-btn" onClick={onClose}>
              ← Вернуться назад
            </button>
          </div>
        ) : isEmpty ? (
          <div className="cart-empty-block">
            <img src={emptyCartImg} alt="Пусто" />
            <h3>Корзина пустая</h3>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button className="cart-close-btn" onClick={onClose}>
              ← Вернуться назад
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-title">{item.title}</p>
                    <p className="cart-item-price">{item.price} ₸</p>
                  </div>
                  <button
                    className="cart-remove-btn"
                    onClick={() => onRemove(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <span className="cart-summary-label">Итого</span>
              <span className="cart-summary-dots">. . . . . . . . . .</span>
              <span className="cart-summary-total">{total} ₸</span>
            </div>

            <button className="cart-order-btn" onClick={onOrder}>
              Оформить заказ
            </button>

            <button className="cart-close-btn" onClick={onClose}>
              ← Вернуться назад
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
