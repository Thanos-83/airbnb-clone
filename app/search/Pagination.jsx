'use client';

import React, { useState, useEffect } from 'react';

import ReactPaginate from 'react-paginate';

export function ResultsPagination({ nextResult, pages }) {
  const handlePageClick = (event) => {
    console.log('Event: ', event);
    nextResult(event.selected);
  };
  const [pagesNumber, setPagesNumber] = useState(pages);
  // console.log('iam here...', pages);
  // console.log('iam here 2...', pagesNumber);
  useEffect(() => {
    setPagesNumber(pages);
  }, [pages]);
  return (
    <div className='mt-8 flex items-center justify-center'>
      <ReactPaginate
        breakLabel='...'
        previousLabel={
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              class='w-4 h-4'>
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15.75 19.5 8.25 12l7.5-7.5'
              />
            </svg>
          </span>
        }
        nextLabel={
          <span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-4 h-4'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m8.25 4.5 7.5 7.5-7.5 7.5'
              />
            </svg>
          </span>
        }
        onPageChange={handlePageClick}
        containerClassName='pagination_container'
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pagesNumber}
        // page={0}
        renderOnZeroPageCount={null}
        initialPage={0}
      />
    </div>
  );
}
