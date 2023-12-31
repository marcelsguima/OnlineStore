import React from 'react';
import PropTypes from 'prop-types';

class ProductPage extends React.Component {
  state = {
    email: '',
    text: '',
    rating: '',
    productEvals: [],
    error: false,
  };

  async componentDidMount() { await this.update(); }

  update = async () => {
    const { match: { params: { productId },
    } } = this.props;
    const productEvals = (JSON.parse(localStorage.getItem(productId)) || []);
    this.setState({ productEvals });
  };

  saveToCart = () => {
    const { location: {
      state: {
        product: {
          id,
          title,
          price,
          thumbnail,
          available_quantity: availableQuantity,
          shipping: { free_shipping: isFreeShipping } },
      },
    } } = this.props;
    const { cartUpdateForce } = this.props;
    const data = {
      amount: 1,
      id,
      title,
      price,
      thumbnail,
      availableQuantity,
      isFreeShipping,
    };
    if (!localStorage.getItem('Cart')) {
      localStorage.setItem('Cart', JSON.stringify([data]));
      localStorage.setItem('CartSize', JSON.stringify(1));
    } else {
      const getItem = JSON.parse(localStorage.getItem('Cart'));
      let getSize = JSON.parse(localStorage.getItem('CartSize'));
      const foundItem = getItem.findIndex((item) => item.id === data.id);
      const negative = -1;
      const maximum = availableQuantity;
      if (foundItem !== negative) {
        if (getItem[foundItem].amount < maximum) {
          getItem[foundItem].amount += 1;
          getSize += 1;
        }
      } else {
        getItem.push(data);
        getSize += 1;
      }
      localStorage.setItem('Cart', JSON.stringify(getItem));
      localStorage.setItem('CartSize', JSON.stringify(getSize));
    }
    cartUpdateForce();
  };

  handleRating = ({ target }) => this.setState({ rating: target.value });

  handleEmail = ({ target }) => this.setState({ email: target.value });

  handleEvaluation = ({ target }) => this.setState({ text: target.value });

  submit = (event) => {
    event.preventDefault();
    const { rating, email, text, productEvals } = this.state;
    const { match: { params: { productId } } } = this.props;
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if (emailCheck.test(email) && rating !== '') {
      const data = { email, text, rating };
      if (typeof productEvals !== 'undefined' && productEvals.length === 0) {
        localStorage.setItem(productId, JSON.stringify([data]));
      }
      localStorage.setItem(productId, JSON.stringify([...productEvals, data]));
      this.setState({ error: false }, () => {
        this.setState({
          rating: '',
          email: '',
          text: '',
        });
      });
    } else { this.setState({ error: true }); }
    this.update();
  };

  render() {
    const { location: {
      state: {
        product: {
          title,
          price,
          thumbnail,
          available_quantity: availableQuantity,
          shipping: { free_shipping: isFreeShipping } },
      },
    } } = this.props;
    const { productEvals, error, email, text } = this.state;
    const available = `${availableQuantity} disponíveis`;
    return (
      <>
        <div data-testid="product">
          <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
          <p data-testid="product-detail-name">{ title }</p>
          <p data-testid="product-detail-price">
            Preço:
            { price }
          </p>
          <p>{available}</p>
          {isFreeShipping && <p data-testid="free-shipping">Frete Grátis</p>}
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ this.saveToCart }
          >
            Adicionar ao Carrinho
          </button>
          <form>
            <input
              type="text"
              data-testid="product-detail-email"
              placeholder="Email"
              onChange={ this.handleEmail }
              value={ email }
            />
            <p htmlFor="nota">Nota</p>
            <label htmlFor="nota1">
              <input
                data-testid="1-rating"
                type="radio"
                name="nota"
                id="nota1"
                value="1"
                onChange={ this.handleRating }
              />
              1
            </label>
            <label htmlFor="nota2">
              <input
                data-testid="2-rating"
                type="radio"
                name="nota"
                id="nota2"
                value="2"
                onChange={ this.handleRating }
              />
              2
            </label>
            <label htmlFor="nota3">
              <input
                data-testid="3-rating"
                type="radio"
                name="nota"
                id="nota3"
                value="3"
                onChange={ this.handleRating }
              />
              3
            </label>
            <label htmlFor="nota4">
              <input
                data-testid="4-rating"
                type="radio"
                name="nota"
                id="nota4"
                value="4"
                onChange={ this.handleRating }
              />
              4
            </label>
            <label htmlFor="nota5">
              <input
                data-testid="5-rating"
                type="radio"
                name="nota"
                id="nota5"
                value="5"
                onChange={ this.handleRating }
              />
              5
            </label>
            <div>
              <textarea
                data-testid="product-detail-evaluation"
                placeholder="Sua avaliação aqui:"
                onChange={ this.handleEvaluation }
                value={ text }
              />
            </div>
            <input
              data-testid="submit-review-btn"
              type="submit"
              value="Postar Avaliação"
              onClick={ this.submit }
            />
          </form>
        </div>
        <div>
          { error && <p data-testid="error-msg">Campos inválidos</p> }
          { productEvals !== null && productEvals.map((evalu, index) => (
            <div key={ index }>
              <h2>{`Avaliação ${index + 1}:`}</h2>
              <p data-testid="review-card-email">{`${evalu.email}`}</p>
              <p data-testid="review-card-rating">{`${evalu.rating}`}</p>
              <p
                data-testid="review-card-evaluation"
              >
                {`${evalu.text}`}
              </p>
            </div>
          ))}
        </div>
      </>
    );
  }
}

ProductPage.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      product: PropTypes.shape({
        id: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        thumbnail: PropTypes.string,
        available_quantity: PropTypes.number,
        shipping: PropTypes.shape({
          free_shipping: PropTypes.bool,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      productId: PropTypes.string.isRequired,
    }),
  }).isRequired,
  cartUpdateForce: PropTypes.func.isRequired,
};

export default ProductPage;
