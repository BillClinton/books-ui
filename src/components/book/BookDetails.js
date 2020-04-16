import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/BookDetails.module.scss';

const BookDetails = ({ book }) => {
  return (
    <li className={styles.row}>
      <div className={styles.item}>
        <div>{book.name}</div>
        <div>
          {book.authors.map((author) => {
            return <p key={author.id}>{author.name}</p>;
          })}
        </div>
      </div>
      <div className={styles.item}>
        <Link to={`/books/edit/${book.id}`}>edit</Link>
        <Link to={`/books/delete/${book.id}`}>delete</Link>
      </div>
    </li>
  );
};

export default BookDetails;
