import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BookStore } from '../../contexts/BookStore';
import BookDetails from './BookDetails';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import styles from './styles/BookList.module.scss';
import { Button } from '@chakra-ui/core';
import LoadingSpinner from '../layout/LoadingSpinner';

const BookList = () => {
  const { store } = useContext(BookStore);
  const history = useHistory();
  const [condemnedBook, setCondemnedBook] = useState(null);
  const books = store.collection;

  const addBook = () => history.push(`/books/new`);

  const deleteBook = () => {
    store.destroy(condemnedBook.id);
    setCondemnedBook(null);
  };

  return (
    <>
      {store.matchState('pending') ? <LoadingSpinner /> : null}
      {store.matchState('failed') ? <p>{store.message}</p> : null}
      {store.matchState('success') ? (
        <>
          {condemnedBook && (
            <ConfirmDeleteModal
              title="Remove a book"
              book={condemnedBook}
              deleteCondemned={deleteBook}
              clearCondemned={() => setCondemnedBook(null)}
            >
              Are you sure you wish to remove <i>{condemnedBook.name}</i> by{' '}
              {condemnedBook.authors.map((author) => author.name).join(' ,')}{' '}
              from your library?
            </ConfirmDeleteModal>
          )}

          <div className={styles.books}>
            <div className={styles.header}>
              <h1>Book list</h1>
              <Button
                aria-label="Add a book"
                m="1"
                variantColor="green"
                onClick={() => addBook()}
              >
                Add a book
              </Button>
            </div>
            <ul className={styles.booklist}>
              {books.map((book) => {
                return (
                  <BookDetails
                    book={book}
                    key={book.id}
                    onDelete={setCondemnedBook}
                  />
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </>
  );
  // return books && books.length ? (
  //   <>
  //     {/* {condemnedBook && (
  //       <ConfirmDeleteModal
  //         title="Remove a book"
  //         book={condemnedBook}
  //         deleteCondemned={deleteBook}
  //         clearCondemned={() => setCondemnedBook(null)}
  //       >
  //         Are you sure you wish to remove <i>{condemnedBook.name}</i> by{' '}
  //         {condemnedBook.authors.map((author) => author.name).join(' ,')} from
  //         your library?
  //       </ConfirmDeleteModal>
  //     )} */}

  //     <div className={styles.books}>
  //       <div className={styles.header}>
  //         <h1>Book list</h1>
  //         <Button
  //           aria-label="Add a book"
  //           m="1"
  //           variantColor="green"
  //           onClick={() => addBook()}
  //         >
  //           Add a book
  //         </Button>
  //       </div>
  //       <ul className={styles.booklist}>
  //         {books.map((book) => {
  //           return (
  //             <BookDetails
  //               book={book}
  //               key={book.id}
  //               onDelete={setCondemnedBook}
  //             />
  //           );
  //         })}
  //       </ul>
  //     </div>
  //   </>
  // ) : (
  //   <Box
  //     mt="100px"
  //     mx="auto"
  //     textAlign="center"
  //     width={[
  //       '100%', // base
  //       '400px', // 480px upwards
  //       '400px', // 768px upwards
  //       '400px', // 992px upwards
  //     ]}
  //   >
  //     <div className="empty">No books found</div>
  //     <Button
  //       aria-label="Add a book"
  //       mt={8}
  //       width="100%"
  //       variantColor="green"
  //       onClick={() => addBook()}
  //     >
  //       Add a book
  //     </Button>
  //   </Box>
  // );
};

export default BookList;
