import React from 'react';
import PropTypes from 'prop-types';

class Product extends React.Component {
  render() {
    const { product: { title, price, thumbnail } } = this.props;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <p>{ title }</p>
        <p>
          Preço:
          { price }
        </p>
      </div>
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
