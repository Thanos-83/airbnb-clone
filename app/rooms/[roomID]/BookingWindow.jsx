'use client';

import React, { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';
import { FaEuroSign } from 'react-icons/fa';
import DateRange from './DateRange';
import { differenceInDays, differenceInCalendarDays } from 'date-fns';
import Guests from './Guests';
import { createReservation } from '@/app/_actions/actions';
import { Award, UnfoldHorizontal } from 'lucide-react';

function BookingWindow({ room, reservations }) {
  const [date, setDate] = useState({
    from: null,
    to: null,
  });

  // console.log('Room info: ', room);
  console.log('Room reservations: ', reservations);
  const reservationDays = reservations?.reservations?.map((reservation) => {
    return { from: reservation.startDate, to: reservation.endDate };
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const selectDays = (day) => {
    // console.log('Selected Days: ', day);
    if (day) {
      setDate({ from: day.from, to: day.to });
    } else {
      setDate({ from: undefined, to: undefined });
    }
  };
  // console.log('Duration: ', differenceInCalendarDays(date.to, date.from));

  const handleAddReservation = async () => {
    const reservationInfo = {
      startDate: date.from,
      endDate: date.to,
      totalPrice:
        differenceInCalendarDays(date.to, date.from) * Number(room.price),
      listing: room._id,
    };
    const response = await createReservation(reservationInfo);
    if (response.message === 'Reservation created') {
      setDate({
        from: undefined,
        to: undefined,
      });
      setAdults(1);
      setChildren(0);
      setInfants(0);
    }
    console.log('Reservation response: ', response);
  };

  return (
    <div className='p-6 rounded-lg shadow-lg border border-[#dddddd]'>
      <div className='flex flex-col'>
        <p className='flex items-end gap-4 font-semibold text-[#222222] text-2xl mb-6'>
          <span className='flex items-center'>
            <FaEuroSign className='w-5 h-5' /> {room.price}
          </span>
          <span className='text-lg font-[400]'>night</span>
        </p>
        <div className='rounded-xl border border-[#dddddd] flex flex-col'>
          <DateRange
            date={date}
            selectDays={selectDays}
            reservationDays={reservationDays}
          />
          <Guests
            adults={adults}
            numberChildren={children}
            infants={infants}
            setAdults={setAdults}
            setChildren={setChildren}
            setInfants={setInfants}
            accommodates={room.accommodates}
          />
        </div>
        <div className='mt-6'>
          <button
            onClick={() => handleAddReservation()}
            disabled={!date.from || !date.to}
            className={`rounded-lg font-semibold p-4 text-center w-full text-white bg-[var(--primary-color)] ${
              !date.from || !date.to
                ? 'opacity-50 cursor-not-allowed'
                : 'opacity-100'
            }`}>
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingWindow;
