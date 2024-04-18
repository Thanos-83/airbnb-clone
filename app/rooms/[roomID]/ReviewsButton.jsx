import React from 'react';

function ReviewsButton({ numOfReviews }) {
  return (
    <button className='underline font-semibold text-[1.25rem]'>
      {numOfReviews} reviews
    </button>
  );
}

export default ReviewsButton;
