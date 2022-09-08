import React from 'react';
import { getCategories } from '../services/api';

class Home extends React.Component {
  state = {
    listaProdutos: [],
    listaCategorias: [],
  };

  componentDidMount() {
    this.categorias();
  }

  categorias = async () => {
    const cat = await getCategories();
    this.setState({ listaCategorias: cat });
  };

  render() {
    const { listaProdutos, listaCategorias } = this.state;
    return (
      <div data-testid="home-initial-message">
        {listaProdutos.length === 0
          ? <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
          : listaProdutos}

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
