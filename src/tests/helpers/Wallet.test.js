import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './renderWith';
import Wallet from '../../pages/Wallet';
import mockData from './mockData';

const initalState = {
  currencies: [
    'USD',
    'CAD',
    'GBP',
    'ARS',
    'BTC',
    'LTC',
    'EUR',
    'JPY',
    'CHF',
    'AUD',
    'CNY',
    'ILS',
    'ETH',
    'XRP',
    'DOGE,',
  ],
  expenses: {
    id: 0,
    value: '12',
    description: 'Restaurante',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentacão',
    exchangeRates: mockData,
  },
};

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockData),
  });
  renderWithRouterAndRedux(<Wallet />, initalState);
});

describe('Wallet page test', () => {
  it('Header test', () => {
    const email = screen.getByTestId('email-field');
    const total = screen.getByTestId('total-field');
    const cambio = screen.getByTestId('header-currency-field');
    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(cambio).toBeInTheDocument();
  });
});
