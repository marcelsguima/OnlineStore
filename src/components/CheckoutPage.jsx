import React from 'react';
import PropTypes from 'prop-types';
import CheckoutProduct from './CheckoutProduct';

class CheckoutPage extends React.Component {
  state = {
    cart: [],
    fullname: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    method: '',
    error: false,
  };

  async componentDidMount() {
    const cart = JSON.parse(localStorage.getItem('Cart'));
    this.setState({ cart });
  }

  handleName = ({ target }) => {
    this.setState({ fullname: target.value });
  };

  handleEmail = ({ target }) => {
    this.setState({ email: target.value });
  };

  handleCPF = ({ target }) => {
    this.setState({ cpf: target.value });
  };

  handlePhone = ({ target }) => {
    this.setState({ phone: target.value });
  };

  handleCEP = ({ target }) => {
    this.setState({ cep: target.value });
  };

  handleAddress = ({ target }) => {
    this.setState({ address: target.value });
  };

  handleMethod = ({ target }) => {
    this.setState({ method: target.value });
  };

  checkout = (event) => {
    event.preventDefault();
    const { cart, fullname, email, cpf, phone, cep, address, method } = this.state;
    const { history } = this.props;
    const emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    if (emailCheck.test(email)
    && fullname !== ''
    && cpf !== ''
    && phone !== ''
    && cep !== ''
    && address !== ''
    && method !== ''
    && (cart !== null || !(typeof cart !== 'undefined' && cart.length === 0))) {
      this.setState({ error: false }, () => {
        localStorage.setItem('Cart', JSON.stringify([]));
        history.push('/');
      });
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    const { cart, error, fullname, email, cpf, phone, cep, address } = this.state;
    return (
      <>
        <div>
          <h1>Checkout:</h1>
          {(cart === null || (typeof cart !== 'undefined' && cart.length === 0)) ? (
            <div data-testid="shopping-cart-empty-message">
              Seu carrinho está vazio
            </div>
          ) : cart.map((product) => (<CheckoutProduct
            key={ product.id }
            product={ product }
            amount={ product.amount }
          />))}
        </div>
        <div>
          <form>
            <input
              type="text"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
              onChange={ this.handleName }
              value={ fullname }
            />
            <input
              type="text"
              data-testid="checkout-email"
              placeholder="Email"
              onChange={ this.handleEmail }
              value={ email }
            />
            <input
              type="text"
              data-testid="checkout-cpf"
              placeholder="CPF"
              onChange={ this.handleCPF }
              value={ cpf }
            />
            <input
              type="text"
              data-testid="checkout-phone"
              placeholder="Telefone"
              onChange={ this.handlePhone }
              value={ phone }
            />
            <input
              type="text"
              data-testid="checkout-cep"
              placeholder="CEP"
              onChange={ this.handleCEP }
              value={ cep }
            />
            <input
              type="text"
              data-testid="checkout-address"
              placeholder="Endereço"
              onChange={ this.handleAddress }
              value={ address }
            />
            <p htmlFor="nota">Método de Pagamento</p>
            <label htmlFor="ticket">
              <input
                data-testid="ticket-payment"
                type="radio"
                name="método"
                id="ticket"
                value="ticket"
                onChange={ this.handleMethod }
              />
              Boleto
            </label>
            <label htmlFor="visa">
              <input
                data-testid="visa-payment"
                type="radio"
                name="método"
                id="visa"
                value="visa"
                onChange={ this.handleMethod }
              />
              Visa
            </label>
            <label htmlFor="master">
              <input
                data-testid="master-payment"
                type="radio"
                name="método"
                id="master"
                value="master"
                onChange={ this.handleMethod }
              />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input
                data-testid="elo-payment"
                type="radio"
                name="método"
                id="elo"
                value="elo"
                onChange={ this.handleMethod }
              />
              Elo
            </label>
            <input
              data-testid="checkout-btn"
              type="submit"
              value="Fazer Checkout"
              onClick={ this.checkout }
            />
          </form>
        </div>
        { error && <div data-testid="error-msg">Campos inválidos</div> }
      </>
    );
  }
}

CheckoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired,
    go: PropTypes.func.isRequired,
  }).isRequired,
};

export default CheckoutPage;
