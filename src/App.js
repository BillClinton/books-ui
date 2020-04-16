import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import BookHome from './components/book/BookHome';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Route path="/books">
          <BookHome />
        </Route>
      </Router>
    </div>
  );
}

export default App;
