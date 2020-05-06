import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BookStoreProvider from '../../contexts/BookStore';
import AuthorStoreProvider from '../../contexts/AuthorStore';
import BookList from './BookList';
import NewBookForm from './NewBookForm';
import EditBook from './EditBook';
import DeleteBook from './DeleteBook';
import NoRouteFound from '../NoRouteFound';

function BookHome() {
  return (
    <>
      <BookStoreProvider>
        <AuthorStoreProvider>
          <Switch>
            <Route exact path="/books" component={BookList} />
            <Route exact path="/books/new" component={NewBookForm} />
            <Route exact path="/books/edit/:id" component={EditBook} />
            <Route exact path="/books/delete/:id" component={DeleteBook} />
            <Route path="*" component={NoRouteFound} />
          </Switch>
        </AuthorStoreProvider>
      </BookStoreProvider>
    </>
  );
}

export default BookHome;
