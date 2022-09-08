import React from 'react';

class Home extends React.Component {
  state = {
    listaProdutos: [],
  };

  render() {
    const { listaProdutos } = this.state;
    return (
      <div data-testid="home-initial-message">
        {listaProdutos.length === 0
          ? <p>Digite algum termo de pesquisa ou escolha uma categoria.</p>
          : listaProdutos}
      </div>
    );
  }
}

export default Home;
