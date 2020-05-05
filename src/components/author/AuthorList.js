import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthorStore } from '../../contexts/AuthorStore';
import AuthorDetails from './AuthorDetails';
import styles from './styles/AuthorList.module.scss';
import { Button } from '@chakra-ui/core';

const AuthorList = () => {
  const { store } = useContext(AuthorStore);
  const history = useHistory();
  const [condemnedBook, setCondemnedBook] = useState(null);
  const authors = store.data;

  const addAuthor = (author) => {
    history.push(`/author/new`);
  };

  return authors && authors.length ? (
    <div className={styles.authors}>
      <div className={styles.header}>
        <h1>Author list</h1>
        <Button
          aria-label="Add an author"
          m="1"
          size="sm"
          variantColor="green"
          onClick={() => addAuthor()}
        >
          Add an author
        </Button>
      </div>
      <ul className={styles.authorlist}>
        {authors.map((author) => {
          return <AuthorDetails author={author} key={author.id} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No authors found</div>
  );
};

export default AuthorList;
