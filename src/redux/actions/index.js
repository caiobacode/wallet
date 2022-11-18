import returnAPI from '../../services/curAPI';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';

export const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  email,
});

export const GET_CUR = 'GET_CUR';
export const SUCESS_CUR_GET = 'SUCESS_CUR_GET';
export const FAIL_CUR = 'FAIL_CUR';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const deleteExpense = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const getCur = () => ({
  type: GET_CUR,
});

export const sucessCurGet = (payload) => ({
  type: SUCESS_CUR_GET,
  payload,
});

export const getCurrencies = () => async (dispatch) => {
  dispatch(getCur());
  const payload = await returnAPI();
  delete payload.USDT;
  const codigos = Object.entries(payload).map((element) => element[1].code);
  dispatch(sucessCurGet(codigos));
};

export const GET_EXPENSE = 'GET_EXPENSE';

const getExpense = (payloadAPI, info) => ({
  type: GET_EXPENSE,
  payloadAPI,
  info,
});

export const thunk = (info) => async (dispatch) => {
  const data = await returnAPI();
  delete data.USDT;
  dispatch(getExpense(data, info));
};
