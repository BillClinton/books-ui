import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import Nav from './components/layout/Nav';
import BookHome from './components/book/BookHome';
import AuthorHome from './components/author/AuthorHome';
import LoginForm from './components/user/LoginForm';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import customTheme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <div>
        <Router history={history}>
          <Nav />
          <Box
            mx="auto"
            width={[
              '100%', // base
              '90%', // 480px upwards
              '90%', // 768px upwards
              '70%', // 992px upwards
            ]}
          >
            <Route path="/books">
              <BookHome />
            </Route>
            <Route path="/authors">
              <AuthorHome />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
          </Box>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
