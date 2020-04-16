import React, { useContext } from 'react';
import { BookStore } from '../../contexts/BookStore';
import EditBookForm from './EditBookForm';

const EditBook = ({ match }) => {
  const { store } = useContext(BookStore);
  const id = parseInt(match.params.id, 10);
  let book = store.edit;

  if (!book || book.id !== id) {
    book = null;
    store.readOne(id);
  }

  return book ? <EditBookForm book={book} /> : <div>loading form...</div>;
};

export default EditBook;
