import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, cartItems, onAddToCart }) => {
  const isInCart = (id) => {
    return cartItems.some(item => item.id === id);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdded={isInCart(product.id)}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
