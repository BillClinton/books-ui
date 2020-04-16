import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BookStore } from '../../contexts/BookStore';
import BookDetails from './BookDetails';

const BookList = () => {
  const { store } = useContext(BookStore);
  const books = store.data;

  console.log(books);
  return books && books.length ? (
    <div className="book-list">
      <h1>
        Book list
        <Link to="/books/new">New</Link>
      </h1>
      <ul>
        {books.map((book) => {
          return (
            <>
              <BookDetails book={book} key={book.id} />
              <div>
                <Link to={`/books/edit/${book.id}`}>edit</Link>
                <Link to={`/books/delete/${book.id}`}>delete</Link>
              </div>
            </>
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No books found</div>
  );
};

export default BookList;
