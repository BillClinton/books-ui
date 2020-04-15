import React, { useContext } from 'react';
import { BookStore } from '../contexts/BookStore';
import BookDetails from './BookDetails';

const BookList = () => {
  const { store } = useContext(BookStore);
  const books = store.data;

  console.log(books);
  return books && books.length ? (
    <div className="book-list">
      <ul>
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
