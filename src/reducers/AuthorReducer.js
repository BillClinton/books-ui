import {
  CREATE_AUTHOR,
  READ_AUTHORS,
  READ_AUTHOR,
  UPDATE_AUTHOR,
  DESTROY_AUTHOR,
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_AUTHOR: {
      return {
        ...state,
        authors: [...state.authors, action.payload],
      };
    }

    case READ_AUTHORS: {
      return { ...state, authors: action.payload };
    }

    case READ_AUTHOR: {
      return { ...state, author: action.payload };
    }

    case UPDATE_AUTHOR: {
      const authors = state.authors;
      const author = action.payload;
      const index = authors.findIndex((item) => item.id === author.id);

      if (~index) {
        authors[index] = author;
        return { ...state, authors, author: null };
      }
      return { ...state };
    }

    case DESTROY_AUTHOR: {
      const authors = state.authors.filter(
        (bk) => bk.id !== parseInt(action.payload, 10)
      );
      return { ...state, authors: authors };
    }

    default:
      return state;
  }
};
