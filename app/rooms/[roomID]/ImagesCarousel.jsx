'use client';

import * as React from 'react';

// import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

export default function ImagesCarousel({ image }) {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='relative'>
      <Carousel setApi={setApi} className='w-full'>
        <CarouselContent className='singleRoom_carousel_container'>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem className='pl-0 h-full' key={index}>
              <div className='relative h-full w-full flex aspect-video items-center justify-center'>
                <Image
                  className='aspect-video'
                  fill
                  src={image}
                  //   width={1000}
                  //   height={700}
                  alt='room image'
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='left-[1rem]' />
        <CarouselNext className='right-[1rem]' />
      </Carousel>
      <div className='absolute bottom-4 right-4 bg-[var(--primary-gray)] py-1 px-3 rounded-md text-center text-sm text-white'>
        <span>{current}</span> / <span>{count}</span>
      </div>
    </div>
  );
}
