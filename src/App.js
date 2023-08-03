import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import CheckoutPage from './components/CheckoutPage';

class App extends React.Component {
  state = {
    cartSize: 0,
  };

  async componentDidMount() {
    this.updateForce();
  }

  updateForce = () => {
    const cartSize = JSON.parse(localStorage.getItem('CartSize'));
    this.setState({ cartSize });
  };

  render() {
    const { cartSize } = this.state;
    return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/Cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
            <p data-testid="shopping-cart-size">{cartSize}</p>
          </div>
          <Switch>
            <Route
              path="/checkout"
              render={
                (p) => <CheckoutPage { ...p } cartUpdateForce={ this.updateForce } />
              }
            />
            <Route
              path="/product/:productId"
              render={
                (p) => <ProductPage { ...p } cartUpdateForce={ this.updateForce } />
              }
            />
            <Route
              path="/Cart"
              render={
                (p) => <Cart { ...p } cartUpdateForce={ this.updateForce } />
              }
            />
            <Route
              exact
              path="/"
              render={
                (p) => <Home { ...p } cartUpdateForce={ this.updateForce } />
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
