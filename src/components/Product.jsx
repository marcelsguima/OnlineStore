import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  saveToCart = () => {
    const { product: { id, title, price, thumbnail } } = this.props;
    const data = {
      amount: 1,
      id,
      title,
      price,
      thumbnail,
    };
    if (!localStorage.getItem('Cart')) {
      localStorage.setItem('Cart', JSON.stringify([data]));
    } else {
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      const negative = -1;
      if (foundItem !== negative) {
        getItem[foundItem].amount += 1;
      } else {
        getItem.push(data);
      }
      localStorage.setItem('Cart', JSON.stringify(getItem));
    }
  };

  render() {
    const { product: { title, price, thumbnail, id } } = this.props;
    const link = `/product/${id}`;
    return (
      <div data-testid="product">
        <Link data-testid="product-detail-link" to={ link }>
          <img src={ thumbnail } alt={ title } />
          <p>{ title }</p>
          <p>
            Preço:
            { price }
          </p>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.saveToCart }
        >
          Adicionar ao Carrinho
        </button>
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
