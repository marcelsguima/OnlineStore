import React from 'react';
import * as api from '../services/api';
import Product from './Product';

class Home extends React.Component {
  state = {
    listaProdutos: [],
    search: '',
    searched: false,
  };

  handleChange = ({ target }) => {
    this.setState({ search: target.value });
  };

  submitSearch = async () => {
    let { listaProdutos } = this.state;
    const { search } = this.state;
    const functionResult = await
    api.getProductsFromCategoryAndQuery(undefined, search);
    listaProdutos = functionResult.results;
    this.setState({ searched: true });
    this.setState({ listaProdutos });
  };

  render() {
    const { listaProdutos, search, searched } = this.state;
    return (
      <div data-testid="home-initial-message">
        <input
          type="text"
          data-testid="query-input"
          value={ search }
          onChange={ this.handleChange }
        />
        <input
          type="submit"
          data-testid="query-button"
          value="Pesquisar"
          onClick={ this.submitSearch }
        />
        {listaProdutos.length === 0 && !searched
          ? <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
          : listaProdutos.map((product) => (
            <Product
              key={ product.id }
              product={ product }
            />))}
        {listaProdutos.length === 0 && searched
        && <p>Nenhum produto foi encontrado</p>}
      </div>
    );
  }
}

export default Home;
