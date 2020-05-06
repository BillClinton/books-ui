import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Nav from './components/layout/Nav';
import BookHome from './components/book/BookHome';
import AuthorHome from './components/author/AuthorHome';
import LoginForm from './components/user/LoginForm';
import NoRouteFound from './components/NoRouteFound';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import customTheme from './theme';
import './App.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
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
          <Switch>
            <Route path="/books">
              <BookHome />
            </Route>
            <Route path="/authors">
              <AuthorHome />
            </Route>
            <Route path="/login">
              <LoginForm />
            </Route>
            <Route path="*" component={NoRouteFound} />
          </Switch>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
