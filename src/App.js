import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Cart from './components/Cart';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Link to="/Cart" data-testid="shopping-cart-button">Carrinho de Compras</Link>
          </div>
          <Switch>
            <Route path="/Cart" component={ Cart } />
            <Route path="/" component={ Home } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
