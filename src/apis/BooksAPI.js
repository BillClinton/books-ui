import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    common: {
      Accept: 'application/json',
    },
    patch: {
      'Content-Type': 'application/merge-patch+json',
    },
  },
});
