'use client';

const Container = ({ children, small, medium, large, fluid }) => {
  return (
    <div
      className={`${
        medium
          ? 'max-w-[1380px]'
          : large
          ? 'max-w-[1920px]'
          : fluid
          ? 'max-w-full'
          : small
          ? 'max-w-[1200px]'
          : 'max-w-[1536px]'
      } mx-auto  px-4 lg:px-8`}>
      {children}
    </div>
  );
};

export default Container;
