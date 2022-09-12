import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart';
import ProductPage from './components/ProductPage';
import CheckoutPage from './components/CheckoutPage';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/Cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
          </div>
          <Switch>
            <Route path="/checkout" component={ CheckoutPage } />
            <Route path="/product/:productId" component={ ProductPage } />
            <Route path="/Cart" component={ Cart } />
            <Route exact path="/" component={ Home } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
