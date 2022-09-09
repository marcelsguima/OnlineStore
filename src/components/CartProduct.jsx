import React from 'react';
import PropTypes from 'prop-types';

class CartProduct extends React.Component {
  render() {
    const { product: { title, price, thumbnail, amount, id } } = this.props;
    const { update } = this.props;

    const increaseQuantity = () => {
      const data = {
        amount,
        id,
        title,
        price,
        thumbnail,
      };
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      getItem[foundItem].amount += 1;
      localStorage.setItem('Cart', JSON.stringify(getItem));
    };

    const decreaseQuantity = () => {
      const data = {
        amount,
        id,
        title,
        price,
        thumbnail,
      };
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      const minimum = 1;
      if (getItem[foundItem].amount !== minimum) {
        getItem[foundItem].amount -= 1;
      }
      localStorage.setItem('Cart', JSON.stringify(getItem));
    };

    const removeProduct = () => {
      const data = {
        amount,
        id,
        title,
        price,
        thumbnail,
      };
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      getItem.splice(foundItem, 1);
      localStorage.setItem('Cart', JSON.stringify(getItem));
    };

    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <p data-testid="shopping-cart-product-name">{ title }</p>
        <p>
          Preço:
          { price }
        </p>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          onClick={ () => { decreaseQuantity(); update(); } }
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">
          x
          { amount }
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          onClick={ () => { increaseQuantity(); update(); } }
        >
          +
        </button>
        <button
          type="button"
          data-testid="remove-product"
          onClick={ () => { removeProduct(); update(); } }
        >
          Remover Produto
        </button>
      </div>
    );
  }
}

CartProduct.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
};

export default CartProduct;
