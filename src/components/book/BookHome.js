import React from 'react';
import { Route } from 'react-router-dom';

import BookStoreProvider from '../contexts/BookStore';
import BookList from './BookList';
import NewBookForm from './NewBookForm';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';

function BookHome() {
  return (
    <>
      <BookStoreProvider>
        <Route exact path="/books" component={BookList} />
        <Route exact path="/books/new" component={NewBookForm} />
        <Route exact path="/books/edit/:id" component={EditBook} />
        <Route exact path="/books/delete/:id" component={DeleteBook} />
      </BookStoreProvider>
    </>
  );
}

export default BookHome;
