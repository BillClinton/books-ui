import React from 'react';
import BookContextProvider from './contexts/BookStore';
import BookList from './components/BookList';

function App() {
  return (
    <div className="App">
      <h1>Book List</h1>
      <BookContextProvider>
        <BookList />
      </BookContextProvider>
    </div>
  );
}

export default App;
