import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/products/get-products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Ошибка загрузки продуктов:', err));
  }, []);

  return (
    <div className="home-page">
      <h1>Добро пожаловать в магазин!</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Home;
//Hello Nikita