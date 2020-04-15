import {
  CREATE_BOOK,
  READ_BOOKS,
  UPDATE_BOOK,
  DESTROY_BOOK,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_BOOK: {
      return {
        ...state,
        books: [...state.books, action.payload.book],
      };
    }

    case READ_BOOKS: {
      return { ...state, books: action.payload };
    }

    case UPDATE_BOOK: {
      const books = state.books;
      const book = action.payload;
      const index = books.findIndex((item) => item._id === book._id);

      if (~index) {
        books[index] = book;
        return { ...state, books, book: null };
      }
      return { ...state };
    }

    case DESTROY_BOOK: {
      const books = state.books.filter((apt) => apt._id !== action.payload);
      return { ...state, books: books };
    }

    default:
      return state;
  }
};
