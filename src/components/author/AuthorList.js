import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthorStore } from '../../contexts/AuthorStore';
import AuthorDetails from './AuthorDetails';
import styles from './styles/AuthorList.module.scss';

const AuthorList = () => {
  const { store } = useContext(AuthorStore);
  const authors = store.data;

  return authors && authors.length ? (
    <div className={styles.authors}>
      <div className={styles.header}>
        <h1>Author list</h1>
        <Link to="/authors/new">New</Link>
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
