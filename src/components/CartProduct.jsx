import React from 'react';
import PropTypes from 'prop-types';

class CartProduct extends React.Component {
  render() {
    const { product: { title, price, thumbnail, amount, id } } = this.props;
    const { update } = this.props;

    const increaseQuantity = async () => {
      const { cartUpdateForce } = this.props;
      const data = {
        amount,
        id,
        title,
        price,
        thumbnail,
      };
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      let getSize = JSON.parse(localStorage.getItem('CartSize'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      const maximum = getItem[foundItem].availableQuantity;
      if (getItem[foundItem].amount !== maximum) {
        getItem[foundItem].amount += 1;
        getSize += 1;
      }
      localStorage.setItem('Cart', JSON.stringify(getItem));
      localStorage.setItem('CartSize', JSON.stringify(getSize));
      cartUpdateForce();
    };

    const decreaseQuantity = () => {
      const { cartUpdateForce } = this.props;
      const data = {
        amount,
        id,
        title,
        price,
        thumbnail,
      };
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      let getSize = JSON.parse(localStorage.getItem('CartSize'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      const minimum = 1;
      if (getItem[foundItem].amount !== minimum) {
        getItem[foundItem].amount -= 1;
        getSize -= 1;
      }
      localStorage.setItem('Cart', JSON.stringify(getItem));
      localStorage.setItem('CartSize', JSON.stringify(getSize));
      cartUpdateForce();
    };

    const removeProduct = () => {
      const { cartUpdateForce } = this.props;
      const data = {
        amount,
        id,
        title,
        price,
        thumbnail,
      };
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      let getSize = JSON.parse(localStorage.getItem('CartSize'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      getSize -= getItem[foundItem].amount;
      getItem.splice(foundItem, 1);
      localStorage.setItem('Cart', JSON.stringify(getItem));
      localStorage.setItem('CartSize', JSON.stringify(getSize));
      cartUpdateForce();
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
  cartUpdateForce: PropTypes.func.isRequired,
};

export default CartProduct;
