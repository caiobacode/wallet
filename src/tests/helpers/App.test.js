import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

const initalState = {
  email: '',
};

beforeEach(() => {
  renderWithRouterAndRedux(<App />, initalState);
});

describe('Login page test', () => {
  it('Email/password input test', () => {
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });

  it('event test', () => {
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(email, 'caioodsf@gmail.com');
    userEvent.type(password, 'meunomeecaio');
    userEvent.click(loginButton);
  });
});
