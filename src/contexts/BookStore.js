import React, { createContext, useReducer, useEffect } from 'react';
import BookReducer from '../reducers/BookReducer';
import {
  createBook,
  readBooks,
  readBook,
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
  const readOne = (id) => readBook(id, dispatch);
  const update = (id, data) => updateBook(id, data, dispatch);
  const destroy = (id) => destroyBook(id, dispatch);

  useEffect(read, []);

  const store = {
    data: state.books,
    edit: state.book,
    create,
    read,
    readOne,
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
