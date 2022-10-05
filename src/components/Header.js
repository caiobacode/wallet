import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Header extends Component {
  state = {
    cambio: 'BRL',
  };

  soma = () => {
    const { field } = this.props;
    let sla = 0;
    field.forEach((element) => {
      const { currency, value } = element;
      const price = element.exchangeRates[currency].ask;
      sla += (Number(value) * Number(price));
    });
    const total = sla.toFixed(2);
    return total;
  };

  render() {
    const { cambio } = this.state;
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{this.soma()}</p>
        <p data-testid="header-currency-field">{cambio}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  field: state.wallet.expenses,
});

Header.propTypes = {
  email: PropType.string.isRequired,
  field: PropType.arrayOf.isRequired,
};

export default connect(mapStateToProps)(Header);
