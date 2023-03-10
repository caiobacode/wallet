import { GET_CUR, SUCESS_CUR_GET,
  GET_EXPENSE, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CUR:
    return {
      ...state,
    };
  case SUCESS_CUR_GET:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: (state.expenses.length - 1) + 1,
        value: action.info.expenseValue,
        description: action.info.description,
        currency: action.info.cambio,
        method: action.info.payment,
        tag: action.info.tag,
        exchangeRates: action.payloadAPI,
      }],
    };
  case REMOVE_EXPENSE: {
    return {
      ...state,
      expenses: [...action.payload],
    };
  }
  default:
    return state;
  }
};

export default wallet;
