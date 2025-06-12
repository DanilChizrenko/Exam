import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} width="100" />
      <h3>{product.title}</h3>
      <p>{product.price} ₸</p>
      <button>В корзину</button>
      <button>♥ В избранное</button>
    </div>
  );
};

export default ProductCard;
