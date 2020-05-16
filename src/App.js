import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from './history';
import Nav from './components/layout/Nav';
import BookHome from './components/book/BookHome';
import AuthorHome from './components/author/AuthorHome';
import AuthContextProvider from './contexts/AuthContext';
import LoginForm from './components/user/LoginForm';
import UserProfile from './components/user/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import NoRouteFound from './components/NoRouteFound';
import { ThemeProvider, CSSReset, Box } from '@chakra-ui/core';
import customTheme from './theme';
import './App.css';

function App() {
  return (
    <AuthContextProvider>
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
              <ProtectedRoute path="/profile">
                <UserProfile />
              </ProtectedRoute>
              <Route path="*" component={NoRouteFound} />
            </Switch>
          </Box>
        </Router>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
