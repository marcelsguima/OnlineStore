import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CartProduct from './CartProduct';

class Cart extends React.Component {
  state = {
    cart: [],
  };

  async componentDidMount() {
    await this.updateForce();
  }

  updateForce = async () => {
    const { cartUpdateForce } = this.props;
    const cart = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ cart });
    cartUpdateForce();
  };

  render() {
    const { cart } = this.state;
    const { cartUpdateForce } = this.props;
    return (
      <div>
        <h1>Carrinho de Compras</h1>
        {(cart === null || (typeof cart !== 'undefined' && cart.length === 0)) ? (
          <div data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </div>
        ) : cart.map((product) => (<CartProduct
          key={ product.id }
          product={ product }
          amount={ product.amount }
          update={ this.updateForce }
          cartUpdateForce={ cartUpdateForce }
        />))}
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

Cart.propTypes = {
  cartUpdateForce: PropTypes.func.isRequired,
};

export default Cart;
