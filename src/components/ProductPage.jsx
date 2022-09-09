import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class ProductPage extends React.Component {
  state = { product: {} };

  async componentDidMount() {
    const { match: { params: { productId } } } = this.props;
    this.setState({ product: await api.getProductById(productId) });
  }

  saveToCart = () => {
    const { product: { id, title, price, thumbnail } } = this.state;
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
    const { product: { title, price, thumbnail } } = this.state;
    return (
      <div data-testid="product">
        <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
        <p data-testid="product-detail-name">{ title }</p>
        <p data-testid="product-detail-price">
          Preço:
          { price }
        </p>
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.saveToCart }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ProductPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductPage;
