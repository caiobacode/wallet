import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptype from 'prop-types';

class Table extends Component {
  cambio = (element) => {
    const naoSei = element.exchangeRates[element.currency].ask;
    const sla = (Number(element.value) * Number(naoSei));
    const reduzido = sla.toFixed(2);
    return reduzido;
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((item) => {
              const moeda = item.exchangeRates[item.currency].name;
              const toFix = Number(item.value).toFixed(2);
              const curr = item.exchangeRates[item.currency].ask;
              return (
                <tr key={ item.id }>
                  <td>{item.description}</td>
                  <td>{item.tag}</td>
                  <td>{item.method}</td>
                  <td>{toFix}</td>
                  <td>{moeda}</td>
                  <td>{Number(curr).toFixed(2)}</td>
                  <td>{this.cambio(item)}</td>
                  <td>Real</td>
                  <td>NADA</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: Proptype.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Table);
