import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/BookDetails.module.scss';
import { IconButton } from '@chakra-ui/core';

const BookDetails = ({ book, onDelete }) => {
  const history = useHistory();

  const editBook = (book) => history.push(`/books/edit/${book.id}`);

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
        <IconButton
          aria-label="Edit book"
          icon="edit"
          m="1"
          size="sm"
          onClick={() => editBook(book)}
        />
        <IconButton
          aria-label="Delete book"
          icon="delete"
          m="1"
          size="sm"
          onClick={() => onDelete(book)}
        />
      </div>
    </li>
  );
};

export default BookDetails;
