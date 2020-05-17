import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { Icon } from '@chakra-ui/core';
import './Nav.scss';

const Nav = () => {
  const [active, setActive] = useState(false);
  const { auth } = useContext(AuthContext);
  const handleClick = () => setActive(!active);

  return (
    <header className="nav-header">
      <div className="inner-wrap">
        <div className="brand">
          <Icon name="bookshelf" color="yellow.500" size="48px" mt={2} />
          <h1>Bookshelf</h1>
        </div>

        <nav className={active ? 'nav-active' : null}>
          <Link to="/">Home</Link>
          {auth.loggedIn ? (
            <>
              <Link to="/books">Books</Link>
              <Link to="/authors">Authors</Link>
              <Link to="/profile">Profile</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <div
          className={`menu-toggle ${active ? 'menu-toggle-active' : null}`}
          onClick={handleClick}
        >
          <svg
            className="menu-open"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>

          <svg
            className="menu-close"
            aria-hidden="true"
            focusable="false"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
            ></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Nav;
