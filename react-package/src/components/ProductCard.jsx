import React, { useState } from 'react';
import likeIcon from '../assets/icons/like.svg';
import likeActiveIcon from '../assets/icons/like-active.svg';
import plusIcon from '../assets/icons/plus.svg';
import checkIcon from '../assets/icons/alternate-done.svg';

const ProductCard = ({ product, isAdded, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAdd = () => {
    if (!isAdded) {
      onAddToCart(product);
    }
  };

  return (
    <div className="product-card">
      <div className="like-icon" onClick={toggleLike}>
        <img src={isLiked ? likeActiveIcon : likeIcon} alt="like" />
      </div>

      <img src={product.image} alt={product.title} className="product-image" />

      <div className="product-info">
        <div className="product-details">
          <h3>{product.title}</h3>
          <span className="label">Цена:</span>
          <p>{product.price} ₸</p>
        </div>

        <div className="product-actions">
          {!isAdded ? (
            <button className="add-btn" onClick={handleAdd}>
              <img src={plusIcon} alt="Добавить" />
            </button>
          ) : (
            <button className="added-btn" disabled>
              <img src={checkIcon} alt="Добавлено" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
