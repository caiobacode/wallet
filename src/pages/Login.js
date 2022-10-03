import React from 'react';
import { connect } from 'react-redux';
import PropType from 'prop-types';
import { submitEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.buttonEnabled());
  };

  buttonEnabled = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const five = 5;
    const testEmail = regex.test(email);
    const testPassword = password.length > five;
    this.setState({ buttonDisabled: !(testEmail && testPassword) });
  };

  handleClick = () => {
    const { dispatch, history } = this.props;
    const { email } = this.state;
    dispatch(submitEmail(email));
    history.push('/carteira');
  };

  render() {
    const { buttonDisabled } = this.state;
    return (
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            onChange={ this.handleChange }
            data-testid="email-input"
            type="email"
            name="email"
          />
        </label>

        <label htmlFor="password-input">
          Password:
          <input
            onChange={ this.handleChange }
            data-testid="password-input"
            type="password"
            name="password"
          />
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
          disabled={ buttonDisabled }
        >
          Entrar
        </button>

      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropType.func.isRequired,
  history: PropType.objectOf.isRequired,
};
export default connect()(Login);
