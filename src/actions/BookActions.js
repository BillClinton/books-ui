import API from '../apis/BooksAPI';
import history from '../history';

import {
  CREATE_BOOK,
  READ_BOOK,
  READ_BOOKS,
  UPDATE_BOOK,
  DESTROY_BOOK,
} from './types';

export const createBook = (formValues, dispatch) => {
  const sendData = async () => await API.post('/api/books', { ...formValues });

  sendData()
    .then((response) => {
      dispatch({
        type: CREATE_BOOK,
        payload: response.data,
      });
      history.push('/books');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const readBook = (id, dispatch) => {
  const getData = async () => await API.get(`/api/books/${id}`);
  getData()
    .then((response) => {
      dispatch({
        type: READ_BOOK,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const readBooks = (dispatch) => {
  const getData = async () => await API.get('/api/books');

  getData().then((response) => {
    dispatch({
      type: READ_BOOKS,
      payload: response.data,
    });
  });
};

export const updateBook = (id, formValues, dispatch) => {
  const updateData = async () =>
    await API.patch(`/api/books/${id}`, JSON.stringify({ ...formValues }));

  updateData()
    .then((response) => {
      dispatch({
        type: UPDATE_BOOK,
        payload: response.data,
      });
      history.push('/books');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const destroyBook = (id, dispatch) => {
  const deleteData = async () => await API.delete(`/api/books/${id}`);

  deleteData().then((response) => {
    dispatch({
      type: DESTROY_BOOK,
      payload: id,
    });
    history.goBack();
  });
};
