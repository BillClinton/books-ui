import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookStore } from '../../contexts/BookStore';
import BookDetails from './BookDetails';
import styles from './styles/BookList.module.scss';

const BookList = () => {
  const { store } = useContext(BookStore);
  const books = store.data;

  return books && books.length ? (
    <div className={styles.books}>
      <div className={styles.header}>
        <h1>Book list</h1>
        <Link to="/books/new">New</Link>
      </div>
      <ul className={styles.booklist}>
        {books.map((book) => {
          return <BookDetails book={book} key={book.id} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No books found</div>
  );
};

export default BookList;
