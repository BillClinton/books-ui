import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AuthorStoreProvider from '../../contexts/AuthorStore';
import AuthorList from './AuthorList';
import NewAuthorForm from './NewAuthorForm';
import EditAuthor from './EditAuthor';
import NoRouteFound from '../NoRouteFound';

function AuthorHome() {
  return (
    <>
      <AuthorStoreProvider>
        <Switch>
          <Route exact path="/authors" component={AuthorList} />
          <Route exact path="/authors/new" component={NewAuthorForm} />
          <Route exact path="/authors/edit/:id" component={EditAuthor} />
          <Route path="*" component={NoRouteFound} />
        </Switch>
      </AuthorStoreProvider>
    </>
  );
}

export default AuthorHome;
