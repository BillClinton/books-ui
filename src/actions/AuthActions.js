import API from '../apis/BooksAPI';
import history from '../history';

import { LOGIN, LOGOUT, LOGIN_FAIL } from './types';

export const doLogin = (formValues, dispatch) => {
  const sendData = async () => await API.post('/login', { ...formValues });

  sendData()
    .then((response) => {
      console.log(response.headers);
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
      history.push('/books');
    })
    .catch((e) => {
      if (e.response && e.response.data.error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: e.response.data.error,
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: 'Unknown error',
        });
      }
    });
};

export const doLogout = (dispatch) => {
  const getData = async () => await API.get('/logout');

  getData().then((response) => {
    dispatch({
      type: LOGOUT,
      payload: response.data,
    });
  });
};
