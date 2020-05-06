import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookStore } from '../../contexts/BookStore';
import BookDetails from './BookDetails';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import styles from './styles/BookList.module.scss';
import { Button } from '@chakra-ui/core';

const BookList = () => {
  const { store } = useContext(BookStore);
  const history = useHistory();
  const [condemnedBook, setCondemnedBook] = useState(null);
  const books = store.data;

  const addBook = () => history.push(`/books/new`);

  return books && books.length ? (
    <>
      <ConfirmDeleteModal
        book={condemnedBook}
        clearCondemned={() => setCondemnedBook(null)}
      />
      <div className={styles.books}>
        <div className={styles.header}>
          <h1>Book list</h1>
          <Button
            aria-label="Add a book"
            m="1"
            size="sm"
            variantColor="green"
            onClick={() => addBook()}
          >
            Add a book
          </Button>
        </div>
        <ul className={styles.booklist}>
          {books.map((book) => {
            return (
              <BookDetails
                book={book}
                key={book.id}
                onDelete={setCondemnedBook}
              />
            );
          })}
        </ul>
      </div>
    </>
  ) : (
    <div className="empty">No books found</div>
  );
};

export default BookList;
