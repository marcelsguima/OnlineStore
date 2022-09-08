import React from 'react';
import * as api from '../services/api';
import Product from './Product';

class Home extends React.Component {
  state = {
    listaProdutos: [],
    search: '',
    searched: false,
    listaCategorias: [],
  };

  componentDidMount() {
    this.categorias();
  }

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

  categorias = async () => {
    const cat = await api.getCategories();
    this.setState({ listaCategorias: cat });
  };

  render() {
    const { listaProdutos, search, searched, listaCategorias } = this.state;
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
        <ul>
          {listaCategorias.map((element) => (
            <div key={ element.id }>
              <button type="button" data-testid="category" name={ element.id }>
                { element.name }
              </button>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
