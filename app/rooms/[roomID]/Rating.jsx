'use client';

function Rating({ reviewLabel, reviewScore, Icon, inDialog }) {
  console.log(Icon);
  return (
    <div
      className={`${
        inDialog
          ? 'rating_container_dialog flex-col items-start px-4 pb-2 lg:flex-row-reverse lg:items-center lg:py-4 lg:border-b lg:border-b-[#b0b0b0] lg:px-0'
          : 'flex-col items-start px-4'
      } flex-1 flex   justify-between `}>
      <div
        className={`${
          inDialog
            ? 'flex-1 flex-col lg:justify-between lg:ml-4 lg:flex-row lg:items-center'
            : 'flex-col'
        } flex  gap-1`}>
        <p className={`font-medium ${inDialog ? 'text-lg' : 'text-xl'}`}>
          {reviewLabel}
        </p>
        <span className={`font-medium ${inDialog ? 'text-lg' : 'text-xl'}`}>
          {Number(reviewScore / 2).toFixed(1)}
        </span>
      </div>
      <Icon />
    </div>
  );
}

export default Rating;
