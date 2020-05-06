import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles/AuthorDetails.module.scss';
import { IconButton } from '@chakra-ui/core';

const AuthorDetails = ({ author, onDelete }) => {
  const history = useHistory();

  const editAuthor = (author) => history.push(`/authors/edit/${author.id}`);

  return (
    <li className={styles.row}>
      <div className={styles.item}>
        <div>{author.name}</div>
      </div>
      <div className={styles.item}>
        <IconButton
          aria-label="Edit book"
          icon="edit"
          m="1"
          size="sm"
          onClick={() => editAuthor(author)}
        />
        <IconButton
          aria-label="Delete book"
          icon="delete"
          m="1"
          size="sm"
          onClick={() => onDelete(author)}
        />
      </div>
    </li>
  );
};

export default AuthorDetails;
