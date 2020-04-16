import React, { createContext, useReducer, useEffect } from 'react';
import AuthorReducer from '../reducers/AuthorReducer';
import {
  createAuthor,
  readAuthors,
  readAuthor,
  updateAuthor,
  destroyAuthor,
} from '../actions/AuthorActions';

export const AuthorStore = createContext();

const initialState = {
  authors: [],
};

const AuthorStoreProvider = (props) => {
  const [state, dispatch] = useReducer(AuthorReducer, initialState);
  const create = (data) => createAuthor(data, dispatch);
  const read = () => readAuthors(dispatch);
  const readOne = (id) => readAuthor(id, dispatch);
  const update = (id, data) => updateAuthor(id, data, dispatch);
  const destroy = (id) => destroyAuthor(id, dispatch);

  useEffect(read, []);

  const store = {
    data: state.authors,
    edit: state.author,
    create,
    read,
    readOne,
    update,
    destroy,
  };

  return (
    <AuthorStore.Provider value={{ store, dispatch }}>
      {props.children}
    </AuthorStore.Provider>
  );
};

export default AuthorStoreProvider;
