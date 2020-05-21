import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthorStore } from '../../contexts/AuthorStore';
import AuthorDetails from './AuthorDetails';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import styles from './styles/AuthorList.module.scss';
import { Button, useToast } from '@chakra-ui/core';
import LoadingSpinner from '../layout/LoadingSpinner';

const AuthorList = () => {
  const { store } = useContext(AuthorStore);
  const history = useHistory();
  const toast = useToast();
  const [condemnedAuthor, setCondemnedAuthor] = useState(null);
  const authors = store.collection;

  const addAuthor = () => history.push('/authors/new');

  const deleteAuthor = () => {
    store.destroy(condemnedAuthor.id);
    setCondemnedAuthor(null);
  };

  useEffect(() => {
    if (store.failure) {
      let title = 'An error occurred.';
      if (store.matchState({ collection: 'failure' })) {
        title = 'Error attempting to load authors.';
        store.send({ to: 'collection', type: 'reset' });
      }
      if (store.matchState({ destroy: 'failure' })) {
        title = 'Error attempting to delete author.';
        store.send({ to: 'destroy', type: 'reset' });
      }

      toast({
        title,
        description: store.message,
        status: 'warning',
        duration: 4000,
        isClosable: true,
      });
    }
  }, [store.failure, store, toast]);

  return (
    <>
      {store.matchState({ collection: 'pending' }) ? <LoadingSpinner /> : null}
      {store.matchState({ collection: 'success' }) ? (
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
      ) : null}
    </>
  );
};

export default AuthorList;
