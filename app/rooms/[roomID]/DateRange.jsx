'use client';
import React, { useState } from 'react';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function DateRange({ date, selectDays, reservationDays }) {
  //   const [date, setDate] = useState({
  //     from: null,
  //     to: null,
  //   });

  const disablePreviusDays = () => {
    console.log('Reservation Days: ', reservationDays);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentDay = new Date().getDate();

    const disabledDays =
      currentDay === 1
        ? []
        : currentDay === 2
        ? [new Date(currentYear, currentMonth, 1)]
        : [
            {
              from: new Date(currentYear, currentMonth, 1),
              to: new Date(currentYear, currentMonth, currentDay - 1),
            },
            reservationDays,
          ];

    return disabledDays.flat(Infinity);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={`w-full flex  justify-start text-left font-normal border-b border-b-[#dddddd]`}>
          <div className='w-1/2 py-3 pl-3 text-start flex flex-col border-r border-r-[#dddddd]'>
            <span className='uppercase font-bold text-sm'>Check-In</span>
            <span className='text-[#6a6a6a] text-md'>
              {date?.from ? format(date.from, 'PPP') : 'Add date'}
            </span>
          </div>
          <div className='w-1/2 py-3 px-3 text-start flex flex-col'>
            <span className='uppercase font-bold text-sm'>Check-Out</span>
            <span className='text-[#6a6a6a] text-md'>
              {date?.to ? format(date.to, 'PPP') : 'Add date'}
            </span>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align='end' className='w-auto p-0'>
        <Calendar
          initialFocus
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          //   onDayClick={selectDays}
          onSelect={selectDays}
          numberOfMonths={2}
          disabled={disablePreviusDays()}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateRange;
