import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    // expense: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  render() {
    const { data } = this.props;
    return (
      <form>
        <label htmlFor="value">
          Expense value:
          <input
            type="number"
            name="value"
            data-testid="value-input"
          />
        </label>

        <label htmlFor="description">
          Expense description:
          <input
            type="text"
            name="description"
            data-testid="description-input"
          />
        </label>

        <label htmlFor="cambio">
          Cambio:
          <select name="cambio" data-testid="currency-input">
            {
              data.map((elemento, index) => (
                <option key={ index }>{elemento}</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="payment">
          Cambio:
          <select name="payment" data-testid="method-input">
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Cambio:
          <select name="tag" data-testid="tag-input">
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

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
