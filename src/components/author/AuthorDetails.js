import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/AuthorDetails.module.scss';

const AuthorDetails = ({ author }) => {
  return (
    <li className={styles.row}>
      <div className={styles.item}>
        <div>{author.name}</div>
      </div>
      <div className={styles.item}>
        <Link to={`/authors/edit/${author.id}`}>edit</Link>
        <Link to={`/authors/delete/${author.id}`}>delete</Link>
      </div>
    </li>
  );
};

export default AuthorDetails;
