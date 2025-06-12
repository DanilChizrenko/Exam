import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CartSidebar from '../components/CartSidebar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(1);

  useEffect(() => {
    fetch('http://localhost:4000/api/products/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Ошибка загрузки продуктов:', err));
  }, []);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => {
    setIsCartOpen(false);
    setOrderPlaced(false);
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleOrder = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Сначала войдите в аккаунт');
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

    try {
      const res = await fetch('http://localhost:4000/api/orders/add-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          items: cartItems,
          total
        })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Ошибка оформления заказа');
      }

      const data = await res.json();
      setOrderPlaced(true);
      setCartItems([]);
      setOrderNumber((n) => n + 1);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="home-page">
      <div className="nav-buttons">
        <button className="nav-button" onClick={openCart}>🛒 Корзина</button>
        <Link to="/orders">
          <button className="nav-button">📦 Мои заказы</button>
        </Link>
        <Link to="/auth">
          <button className="nav-button">👤 Войти</button>
        </Link>
      </div>

      <h1>Все товары</h1>
      <ProductList
        products={products}
        cartItems={cartItems}
        onAddToCart={addToCart}
      />


      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onOrder={handleOrder}
        orderPlaced={orderPlaced}
        orderNumber={orderNumber}
      />
    </div>
  );
};

export default Home;
