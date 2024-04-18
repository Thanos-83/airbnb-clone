'use client';

const Container = ({ children, medium }) => {
  return (
    <div
      className={`${
        medium ? 'max-w-[1380px]' : 'max-w-[1920px]'
      } mx-auto px-8 `}>
      {children}
    </div>
  );
};

export default Container;
