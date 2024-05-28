'use client';

import { Progress } from '@/components/ui/progress';
import Cleanliness from '@/svg/reviews/Cleanliness';
import Accuracy from '@/svg/reviews/Accuracy';
import CheckIn from '@/svg/reviews/CheckIn';
import Communication from '@/svg/reviews/Communication';
import Location from '@/svg/reviews/Location';
import Value from '@/svg/reviews/Value';
import Rating from './Rating';

function Ratings({ inDialog, reviewScores }) {
  console.log('Review Scores: ', reviewScores);
  const ratingsData = [
    {
      score: reviewScores ? reviewScores.review_scores_cleanliness : 0,
      svgIcon: Cleanliness,
      reviewLabel: 'Cleanliness',
    },
    {
      score: reviewScores ? reviewScores.review_scores_accuracy : 0,
      svgIcon: Accuracy,
      reviewLabel: 'Accuracy',
    },
    {
      score: reviewScores ? reviewScores.review_scores_checkin : 0,
      svgIcon: CheckIn,
      reviewLabel: 'Check-in',
    },
    {
      score: reviewScores ? reviewScores.review_scores_communication : 0,
      svgIcon: Communication,
      reviewLabel: 'Communication',
    },
    {
      score: reviewScores ? reviewScores.review_scores_location : 0,
      svgIcon: Location,
      reviewLabel: 'Location',
    },
    {
      score: reviewScores ? reviewScores.review_scores_value : 0,
      svgIcon: Value,
      reviewLabel: 'Value',
    },
  ];
  return (
    <div
      className={`ratings_container no-scrollbar grid grid-flow-col overflow-y-hidden auto-cols-[minmax(115px,1fr)] overflow-x-auto ${
        inDialog
          ? 'divide-x gap-4 lg:divide-x-0 lg:gap-0 lg:flex lg:flex-col'
          : 'divide-x '
      } `}>
      <div className={`flex-1 ${inDialog ? 'mb-4' : 'pr-4'}`}>
        <p className='mb-1 font-medium text-[1rem]'>Overall rating</p>
        <ul className='space-y-0'>
          <li className='flex items-center gap-2'>
            <span className='text-xs leading-3 text-[#6a6a6a]'>5</span>
            <Progress value={80} className='h-1 w-full' />
          </li>
          <li className='flex items-center gap-2'>
            <span className='text-xs leading-3 text-[#6a6a6a]'>4</span>
            <Progress value={10} className='h-1' />
          </li>
          <li className='flex items-center gap-2'>
            <span className='text-xs leading-3 text-[#6a6a6a]'>3</span>
            <Progress value={10} className='h-1' />
          </li>
          <li className='flex items-center gap-2'>
            <span className='text-xs leading-3 text-[#6a6a6a]'>2</span>
            <Progress value={null} className='h-1' />
          </li>
          <li className='flex items-center gap-2'>
            <span className='text-xs leading-3 text-[#6a6a6a]'>1</span>
            <Progress value={null} className='h-1' />
          </li>
        </ul>
      </div>

      {ratingsData.map((ratingData, index) => (
        <Rating
          key={index}
          reviewScore={ratingData.score}
          Icon={ratingData.svgIcon}
          inDialog={inDialog}
          reviewLabel={ratingData.reviewLabel}
        />
      ))}
    </div>
  );
}

export default Ratings;
