import API from '../apis/API';

import {
  CREATE_BOOK,
  READ_BOOK,
  READ_BOOKS,
  UPDATE_BOOK,
  DESTROY_BOOK,
} from './types';

export const createBook = (formValues, dispatch) => {
  const sendData = async () => await API.post('/books', { ...formValues });

  sendData()
    .then((response) => {
      dispatch({
        type: CREATE_BOOK,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const readBook = (id, dispatch) => {
  const getData = async () => await API.get(`/books/${id}`);
  getData()
    .then((response) => {
      dispatch({
        type: READ_BOOK,
        payload: response.data,
      });
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const readBooks = (dispatch) => {
  const getData = async () => await API.get('/books');

  getData().then((response) => {
    dispatch({
      type: READ_BOOKS,
      payload: response.data,
    });
  });
};

export const updateBook = (id, formValues, dispatch) => {
  const updateData = async () =>
    await API.patch(`/books/${id}`, { ...formValues });

  updateData()
    .then((response) => {
      dispatch({
        type: UPDATE_BOOK,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteBook = (id, dispatch) => {
  const deleteData = async () => await API.delete(`/books/${id}`);

  deleteData().then((response) => {
    dispatch({
      type: DESTROY_BOOK,
      payload: id,
    });
  });
};
