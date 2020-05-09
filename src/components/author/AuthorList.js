import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthorStore } from '../../contexts/AuthorStore';
import AuthorDetails from './AuthorDetails';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import styles from './styles/AuthorList.module.scss';
import { Box, Button } from '@chakra-ui/core';

const AuthorList = () => {
  const { store } = useContext(AuthorStore);
  const history = useHistory();
  const [condemnedAuthor, setCondemnedAuthor] = useState(null);
  const authors = store.data;

  const addAuthor = () => history.push('/authors/new');

  const deleteAuthor = () => {
    store.destroy(condemnedAuthor.id);
    setCondemnedAuthor(null);
  };

  return authors && authors.length ? (
    <>
      {condemnedAuthor && (
        <ConfirmDeleteModal
          title="Remove author"
          deleteCondemned={deleteAuthor}
          clearCondemned={() => setCondemnedAuthor(null)}
        >
          Are you sure you wish to remove <i>{condemnedAuthor.name}</i>
        </ConfirmDeleteModal>
      )}

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
            return (
              <AuthorDetails
                author={author}
                key={author.id}
                onDelete={setCondemnedAuthor}
              />
            );
          })}
        </ul>
      </div>
    </>
  ) : (
    <Box
      mt="100px"
      mx="auto"
      textAlign="center"
      width={[
        '100%', // base
        '400px', // 480px upwards
        '400px', // 768px upwards
        '400px', // 992px upwards
      ]}
    >
      <div className="empty">No authors found</div>
      <Button
        aria-label="Add a book"
        mt={8}
        width="100%"
        variantColor="green"
        onClick={() => addAuthor()}
      >
        Add an Author
      </Button>
    </Box>
  );
};

export default AuthorList;
