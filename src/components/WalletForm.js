import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, thunk } from '../redux/actions';

class WalletForm extends Component {
  state = {
    expenseValue: '',
    description: '',
    cambio: 'USD',
    payment: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(thunk(this.state));
    this.setState({
      expenseValue: '',
      description: '',
      cambio: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  render() {
    const { data } = this.props;
    const { expenseValue, description, cambio, payment, tag } = this.state;
    return (
      <form>
        <label htmlFor="expenseValue">
          Expense value:
          <input
            onChange={ this.handleChange }
            type="number"
            value={ expenseValue }
            name="expenseValue"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Expense description:
          <input
            onChange={ this.handleChange }
            type="text"
            value={ description }
            name="description"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="cambio">
          Cambio:
          <select
            value={ cambio }
            name="cambio"
            data-testid="currency-input"
            onChange={ this.handleChange }
          >
            {
              data.map((elemento, index) => (
                <option key={ index }>{elemento}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="payment">
          Forma de pagamento:
          <select
            name="payment"
            value={ payment }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Tipo:
          <select
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.wallet.currencies,
});

WalletForm.propTypes = {
  dispatch: PropType.func.isRequired,
  data: PropType.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
