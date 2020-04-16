import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import BookHome from './components/book/BookHome';
import AuthorHome from './components/author/AuthorHome';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/books">
          <BookHome />
        </Route>
        <Route path="/authors">
          <AuthorHome />
        </Route>
      </Router>
    </div>
  );
}

export default App;
