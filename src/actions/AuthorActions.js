import API from '../apis/BooksAPI';
import history from '../history';

import {
  CREATE_AUTHOR,
  READ_AUTHOR,
  READ_AUTHORS,
  UPDATE_AUTHOR,
  DESTROY_AUTHOR,
} from './types';

export const createAuthor = (formValues, dispatch) => {
  const sendData = async () =>
    await API.post('/api/authors', { ...formValues });

  sendData()
    .then((response) => {
      dispatch({
        type: CREATE_AUTHOR,
        payload: response.data,
      });
      history.push('/authors');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const readAuthor = (id, dispatch) => {
  const getData = async () => await API.get(`/api/authors/${id}`);
  getData()
    .then((response) => {
      dispatch({
        type: READ_AUTHOR,
        payload: response.data,
      });
    })
    .catch((e) => {
      console.log(e);
    });
};

export const readAuthors = (dispatch) => {
  const getData = async () => await API.get('/api/authors');

  getData().then((response) => {
    dispatch({
      type: READ_AUTHORS,
      payload: response.data,
    });
  });
};

export const updateAuthor = (id, formValues, dispatch) => {
  const updateData = async () =>
    await API.patch(`/api/authors/${id}`, JSON.stringify({ ...formValues }));

  updateData()
    .then((response) => {
      dispatch({
        type: UPDATE_AUTHOR,
        payload: response.data,
      });
      history.push('/authors');
    })
    .catch((e) => {
      console.log(e);
    });
};

export const destroyAuthor = (id, dispatch) => {
  const deleteData = async () => await API.delete(`/api/authors/${id}`);

  deleteData().then((response) => {
    dispatch({
      type: DESTROY_AUTHOR,
      payload: id,
    });
  });
};
