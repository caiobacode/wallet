import returnAPI from '../../services/curAPI';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';

export const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  email,
});

export const GET_CUR = 'GET_CUR';
export const SUCESS_CUR_GET = 'SUCESS_CUR_GET';
export const FAIL_CUR = 'FAIL_CUR';

export const getCur = () => ({
  type: GET_CUR,
});

export const sucessCurGet = (payload) => ({
  type: SUCESS_CUR_GET,
  payload,
});

export const failCur = (err) => ({
  type: FAIL_CUR,
  err,
});

export const getCurrencies = () => async (dispatch) => {
  dispatch(getCur());
  try {
    const payload = await returnAPI();
    dispatch(sucessCurGet(payload));
  } catch (err) {
    dispatch(failCur(err));
  }
};
