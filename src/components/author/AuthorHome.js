import React from 'react';
import { Route } from 'react-router-dom';

import AuthorStoreProvider from '../../contexts/AuthorStore';
import AuthorList from './AuthorList';
import NewAuthorForm from './NewAuthorForm';
import EditAuthor from './EditAuthor';
import DeleteAuthor from './DeleteAuthor';

function AuthorHome() {
  return (
    <>
      <AuthorStoreProvider>
        <Route exact path="/authors" component={AuthorList} />
        <Route exact path="/authors/new" component={NewAuthorForm} />
        <Route exact path="/authors/edit/:id" component={EditAuthor} />
        <Route exact path="/authors/delete/:id" component={DeleteAuthor} />
      </AuthorStoreProvider>
    </>
  );
}

export default AuthorHome;
