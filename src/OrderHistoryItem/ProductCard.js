import React from 'react';
// import PropTypes from 'prop-types';

const ProductCard = ({
  imageAlt,
  imageSrc,
  productTitle,
  productVariant,
  price
}) => (
  <div className="column is-6">
    <div className="media">
      <div className="media-left">
        <img alt={imageAlt} className="image" src={imageSrc} />
      </div>
      <div className="media-content">
        <div>
          <p className="product-title">{productTitle}</p>
          <p className="product-variants">{productVariant}</p>
        </div>
      </div>
      <div className="media-right">
        <p className="product-price">${price}</p>
      </div>
    </div>
  </div>
);

// ProductCard.propTypes = {
//   imageAlt: PropTypes.string,
//   imageSrc: PropTypes.string,
//   productTitle: PropTypes.string,
//   productVariant: PropTypes.arrayOf[PropTypes.string],
//   price: PropTypes.number
// };

export default ProductCard;
