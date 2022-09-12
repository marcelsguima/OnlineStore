import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Product extends React.Component {
  saveToCart = () => {
    const { product: { id,
      title,
      price,
      thumbnail,
      available_quantity: availableQuantity,
      shipping: { free_shipping: isFreeShipping } } } = this.props;
    const { cartUpdateForce } = this.props;
    const data = {
      amount: 1,
      id,
      title,
      price,
      thumbnail,
      availableQuantity,
      isFreeShipping,
    };
    if (!localStorage.getItem('Cart')) {
      localStorage.setItem('Cart', JSON.stringify([data]));
      localStorage.setItem('CartSize', JSON.stringify(1));
    } else {
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      let getSize = JSON.parse(localStorage.getItem('CartSize'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      const maximum = availableQuantity;
      const negative = -1;
      if (foundItem !== negative) {
        if (getItem[foundItem].amount < maximum) {
          getItem[foundItem].amount += 1;
          getSize += 1;
        }
      } else {
        getItem.push(data);
        getSize += 1;
      }
      localStorage.setItem('Cart', JSON.stringify(getItem));
      localStorage.setItem('CartSize', JSON.stringify(getSize));
    }
    cartUpdateForce();
  };

  render() {
    const { product } = this.props;
    const { product: { title, price, thumbnail, id, available_quantity: availableQuantity,
      shipping: { free_shipping: isFreeShipping } } } = this.props;
    const link = `/product/${id}`;
    const available = `Unidades disponíveis: ${availableQuantity}`;
    return (
      <div data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ { pathname: link, state: { product } } }
        >
          <img src={ thumbnail } alt={ title } />
          <p>{ title }</p>
          <p>
            Preço:
            { price }
          </p>
          <p>{available}</p>
          {isFreeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
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
    available_quantity: PropTypes.number.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  cartUpdateForce: PropTypes.func.isRequired,
};

export default Product;
