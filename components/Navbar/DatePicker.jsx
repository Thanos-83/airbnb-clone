'use client';

import React, { useState } from 'react';
// import { CalendarIcon } from '@radix-ui/react-icons';
import { addDays, format } from 'date-fns';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function DatePicker({ className }) {
  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  const disablePreviusDays = () => {
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
          ];

    return disabledDays;
  };
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal p-0 border-none outline-none hover:bg-inherit',
              !date && 'text-muted-foreground'
            )}>
            {/* <CalendarIcon className='mr-2 h-4 w-4' /> */}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd')} - {format(date.to, 'LLL dd')}
                </>
              ) : (
                format(date.from, 'LLL dd')
              )
            ) : (
              <span>Add dates</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0 mt-4' align='center'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            fromMonth={new Date()}
            disabled={disablePreviusDays()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
