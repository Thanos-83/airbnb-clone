import React from 'react';
import Review from './Review';
import { ReviewsDialog } from './ReviewsDialog';

function Reviews({ reviews, inDialog, isMobile }) {
  return (
    <div className={`${!inDialog && !isMobile && 'reviews_container'}`}>
      {reviews.length > 6 && !inDialog
        ? reviews
            .slice(1, 7)
            .map((review, index) => (
              <Review
                isMobile={isMobile}
                inDialog={inDialog}
                review={review}
                key={index}
              />
            ))
        : reviews.map((review, index) => (
            <Review
              isMobile={isMobile}
              inDialog={inDialog}
              review={review}
              key={index}
            />
          ))}
    </div>
  );
}

export default Reviews;
