import React from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';

class ProductPage extends React.Component {
  state = { product: {} };

  async componentDidMount() {
    const { match: { params: { productId } } } = this.props;
    this.setState({ product: await api.getProductById(productId) });
  }

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
      </div>
    );
  }
}

ProductPage.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default ProductPage;
