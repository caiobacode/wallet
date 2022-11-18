import React, { Component } from 'react';
import PropType from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, thunk, deleteExpense } from '../redux/actions';

const firstState = {
  expenseValue: '',
  description: '',
  cambio: 'USD',
  payment: 'Dinheiro',
  tag: 'Alimentação',
  editOrNot: false,
};

class WalletForm extends Component {
  state = firstState;

  componentDidMount() {
    const { dispatch, editElement } = this.props;
    console.log(editElement);
    dispatch(getCurrencies());
  }

  componentDidUpdate(prevProps) {
    const { editElement } = this.props;
    if (prevProps.editElement !== editElement) {
      this.setState({
        expenseValue: editElement.value,
        description: editElement.description,
        cambio: editElement.currency,
        payment: editElement.method,
        tag: editElement.tag,
        editOrNot: true,
      });
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(thunk(this.state));
    this.setState(firstState);
  };

  handleClickEdit = () => {
    const { dispatch, expences, editElement } = this.props;
    const { expenseValue, description, cambio, payment, tag } = this.state;
    const newExpences = [...expences];
    newExpences.forEach((ex) => {
      if (ex.id === editElement.id) {
        newExpences[editElement.id].currency = cambio;
        newExpences[editElement.id].description = description;
        newExpences[editElement.id].method = payment;
        newExpences[editElement.id].value = expenseValue;
        newExpences[editElement.id].tag = tag;
      }
    });
    dispatch(deleteExpense(newExpences));
    this.setState(firstState);
  };

  render() {
    const { data } = this.props;
    const { expenseValue, description, cambio, payment, tag, editOrNot } = this.state;
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
        {
          editOrNot ? (
            <button
              type="button"
              data-testid="edit-input-btn"
              onClick={ this.handleClickEdit }
            >
              Editar despesa
            </button>)
            : (
              <button
                type="button"
                data-testid="add-btn"
                onClick={ this.handleClick }
              >
                Adicionar despesa
              </button>)
        }

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.wallet.currencies,
  expences: state.wallet.expenses,
});

WalletForm.propTypes = {
  expences: PropType.arrayOf.isRequired,
  editElement: PropType.shape.isRequired,
  dispatch: PropType.func.isRequired,
  data: PropType.arrayOf.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
