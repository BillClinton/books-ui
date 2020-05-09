import axios from 'axios';

const BooksApi = axios.create({
  baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    common: {
      Accept: 'application/json',
    },
    patch: {
      'Content-Type': 'application/merge-patch+json',
    },
  },
});

export default BooksApi;
