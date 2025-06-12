import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CartSidebar from '../components/CartSidebar';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    return storedOrders.length + 1;
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/api/products/get-products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Ошибка загрузки продуктов:', err));
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

  const removeFromCart = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  };

  const handleOrder = () => {
    const newOrder = {
      id: Date.now(),
      number: orderNumber,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0),
      date: new Date().toLocaleString()
    };

    const prevOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const updatedOrders = [...prevOrders, newOrder];
    localStorage.setItem('orders', JSON.stringify(updatedOrders));

    setCartItems([]);
    setOrderPlaced(true);
    setIsCartOpen(true);
    setOrderNumber(prev => prev + 1);
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
      <ProductList products={products} onAddToCart={addToCart} />

      <CartSidebar
        isOpen={isCartOpen}
        onClose={closeCart}
        cartItems={cartItems}
        onRemove={removeFromCart}
        onOrder={handleOrder}
        orderPlaced={orderPlaced}
        orderNumber={orderNumber - 1}
      />
    </div>
  );
};

export default Home;
