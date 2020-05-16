import React, { useContext, useEffect } from 'react';
import { BookStore } from '../../contexts/BookStore';
import { AuthorStore } from '../../contexts/AuthorStore';
import EditBookForm from './EditBookForm';
import LoadingSpinner from '../layout/LoadingSpinner';

const EditBook = ({ match }) => {
  const { store: bookStore } = useContext(BookStore);
  const { store: authorStore } = useContext(AuthorStore);
  const id = parseInt(match.params.id, 10);
  let book = bookStore.item;
  const authors = authorStore.collection;

  useEffect(() => {
    bookStore.readItem(id);
  }, [id]);

  return (
    <>
      {bookStore.matchItemState('itemPending') ? <LoadingSpinner /> : null}
      {bookStore.matchItemState('success') ? (
        <EditBookForm book={book} authors={authors} />
      ) : null}
    </>
  );
};

export default EditBook;
