import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>Нет доступных товаров</p>
      ) : (
        products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))
      )}
    </div>
  );
};

export default ProductList;
