import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  expenses: [{
    id: 0,
    value: '12',
    description: 'Restaurante',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentacão',
    exchangeRates: mockData,
  }],
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
  it('Delete test', async () => {
    const addBtn = screen.getByTestId('add-btn');
    userEvent.click(addBtn);
    const deleteBtn = await screen.findByTestId('delete-btn');
    userEvent.click(deleteBtn);
    expect(addBtn).toBeInTheDocument();
  });
  it('Edit test', async () => {
    const addBtn = screen.getByTestId('add-btn');
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    const editBtn = await screen.findAllByTestId('edit-btn');
    userEvent.click(editBtn[0]);
    userEvent.click(editBtn[1]);
  });
  it('Inputs test', () => {
    const description = screen.getByTestId('description-input');
    userEvent.type(description, 'ovots');
  });
  it('Edit test form', async () => {
    const addBtn = screen.getByTestId('add-btn');
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    userEvent.click(addBtn);
    const editBtn = await screen.findAllByTestId('edit-btn');
    userEvent.click(editBtn[0]);
    const newEditSubmit = await screen.findByTestId('edit-input-btn');
    userEvent.click(newEditSubmit);
  });
});
