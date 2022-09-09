import React from 'react';
import CartProduct from './CartProduct';

class Cart extends React.Component {
  state = {
    cart: [],
  };

  async componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ cart });
  }

  updateForce = async () => {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ cart });
  };

  render() {
    const { cart } = this.state;
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
        />))}
      </div>
    );
  }
}

export default Cart;
