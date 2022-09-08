import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  render() {
    const { product: { title, price, thumbnail, id } } = this.props;
    const link = `/product/${id}`;
    return (
      <Link data-testid="product-detail-link" to={ link }>
        <div data-testid="product">
          <img src={ thumbnail } alt={ title } />
          <p>{ title }</p>
          <p>
            Preço:
            { price }
          </p>
        </div>
      </Link>
    );
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
