'use client';

import React, { useState } from 'react';

import ReactPaginate from 'react-paginate';

export function ResultsPagination({ nextResult, pages }) {
  const handlePageClick = (event) => {
    console.log('Event: ', event);
    nextResult(event.selected + 1);
  };
  return (
    <div className='mt-8 flex items-center justify-center'>
      <ReactPaginate
        breakLabel='...'
        nextLabel={<span> next </span>}
        onPageChange={handlePageClick}
        containerClassName='pagination_container'
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pages}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
