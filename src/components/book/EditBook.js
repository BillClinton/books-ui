import React, { useContext } from 'react';
import { BookStore } from '../../contexts/BookStore';
import { AuthorStore } from '../../contexts/AuthorStore';
import EditBookForm from './EditBookForm';

const EditBook = ({ match }) => {
  const { store: bookStore } = useContext(BookStore);
  const { store: authorStore } = useContext(AuthorStore);
  const id = parseInt(match.params.id, 10);
  let book = bookStore.edit;
  const authors = authorStore.data;

  if (!book || book.id !== id) {
    book = null;
    bookStore.readOne(id);
  }

  return book ? (
    <EditBookForm book={book} authors={authors} />
  ) : (
    <div>loading form...</div>
  );
};

export default EditBook;
