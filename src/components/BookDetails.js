import React from 'react';

const BookDetails = ({ book }) => {
  return (
    <li>
      <div className="title">{book.name}</div>
      <div className="author">{book.author}</div>
    </li>
  );
};

export default BookDetails;
