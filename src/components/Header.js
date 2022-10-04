import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';

class Header extends Component {
  state = {
    gastos: 0,
    cambio: 'BRL',
  };

  render() {
    const { gastos, cambio } = this.state;
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">{email}</p>
        <p data-testid="total-field">{gastos}</p>
        <p data-testid="header-currency-field">{cambio}</p>
      </div>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  email: user.email,
});

Header.propTypes = {
  email: PropType.string.isRequired,
};

export default connect(mapStateToProps)(Header);
