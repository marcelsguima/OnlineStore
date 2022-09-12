import React from 'react';
import PropTypes from 'prop-types';

class CheckoutProduct extends React.Component {
  render() {
    const { product: { title, price, thumbnail, amount } } = this.props;

    return (
      <div>
        <img src={ thumbnail } alt={ title } />
        <p>{ title }</p>
        <p>
          Preço:
          { price }
        </p>
        <p>
          x
          { amount }
        </p>
      </div>
    );
  }
}

CheckoutProduct.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default CheckoutProduct;
