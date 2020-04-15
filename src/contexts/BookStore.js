import React, { createContext, useReducer, useEffect } from 'react';
import BookReducer from '../reducers/BookReducer';
import {
  createBook,
  readBooks,
  updateBook,
  destroyBook,
} from '../actions/BookActions';

export const BookStore = createContext();

const initialState = {
  books: [],
};

const BookStoreProvider = (props) => {
  const [state, dispatch] = useReducer(BookReducer, initialState);
  const create = (data) => createBook(data, dispatch);
  const read = () => readBooks(dispatch);
  const update = (id, data) => updateBook(id, data, dispatch);
  const destroy = (id) => destroyBook(id, dispatch);

  useEffect(read, []);

  const store = {
    data: state.books,
    create,
    read,
    update,
    destroy,
  };

  return (
    <BookStore.Provider value={{ store, dispatch }}>
      {props.children}
    </BookStore.Provider>
  );
};

export default BookStoreProvider;
