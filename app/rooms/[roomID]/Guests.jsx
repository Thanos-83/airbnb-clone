'use client';
import React, { useState } from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';
import { CiCircleMinus } from 'react-icons/ci';
import { CiCirclePlus } from 'react-icons/ci';
import { FiPlus } from 'react-icons/fi';
import { FiMinus } from 'react-icons/fi';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

function Guests({
  adults,
  numberChildren,
  infants,
  setAdults,
  setChildren,
  setInfants,
  accommodates,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className='p-3 w-full text-start flex items-center justify-between'>
          <div className='flex flex-col'>
            <span className='uppercase font-bold text-sm'>Guests</span>
            <span className='text-[#6a6a6a] text-md'>
              {adults + numberChildren} guests{' '}
              {infants > 0 && `, ${infants} infants`}
            </span>
          </div>
          <FaAngleDown />
        </button>
      </PopoverTrigger>
      <PopoverContent align='center' className='w-[450px] p-4 space-y-8'>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start'>
            <p className='font-semibold text-xl text-[#222222]'>Adults</p>
            <p className='text-sm'>Age 13+</p>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={(e) => setAdults((prev) => prev - 1)}
              disabled={adults <= 1}
              className={`aspect-square rounded-full border border-[#222222] ${
                adults <= 1 && 'border-gray-200 cursor-not-allowed'
              }`}>
              <FiMinus className={`w-8 ${adults <= 1 && 'text-gray-200'}`} />
            </button>
            <p>{adults}</p>
            <button
              disabled={adults + numberChildren === accommodates}
              onClick={(e) => setAdults((prev) => prev + 1)}
              className={`aspect-square rounded-full border border-[#222222] ${
                adults + numberChildren === accommodates &&
                'border-gray-200 cursor-not-allowed'
              }`}>
              <FiPlus
                className={`w-8 ${
                  adults + numberChildren === accommodates && 'text-gray-200'
                }`}
              />
            </button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start'>
            <p className='font-semibold text-xl text-[#222222]'>Children</p>
            <p className='text-sm'>Age 2-12</p>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={(e) => setChildren((prev) => prev - 1)}
              disabled={numberChildren < 1}
              className={`aspect-square rounded-full border border-[#222222] ${
                numberChildren < 1 && 'border-gray-200 cursor-not-allowed'
              }`}>
              <FiMinus
                className={`w-8 ${numberChildren < 1 && 'text-gray-200'}`}
              />
            </button>
            <p>{numberChildren}</p>
            <button
              disabled={adults + numberChildren === accommodates}
              onClick={(e) => setChildren((prev) => prev + 1)}
              className={`aspect-square rounded-full border border-[#222222] ${
                adults + numberChildren === accommodates &&
                'border-gray-200 cursor-not-allowed'
              }`}>
              <FiPlus
                className={`w-8 ${
                  adults + numberChildren === accommodates && 'text-gray-200'
                }`}
              />
            </button>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start'>
            <p className='font-semibold text-xl text-[#222222]'>Infants</p>
            <p className='text-sm'>Under 2</p>
          </div>
          <div className='flex items-center gap-3'>
            <button
              onClick={() => setInfants((prev) => prev - 1)}
              disabled={infants < 1}
              className={`aspect-square rounded-full border border-[#222222] ${
                infants < 1 && 'border-gray-200 cursor-not-allowed'
              }`}>
              <FiMinus className={`w-8 ${infants < 1 && 'text-gray-200'}`} />
            </button>
            <p>{infants}</p>
            <button
              disabled={infants >= 5}
              onClick={(e) => setInfants((prev) => prev + 1)}
              className={`aspect-square rounded-full border border-[#222222] ${
                infants >= 5 && 'border-gray-200 cursor-not-allowed'
              }`}>
              <FiPlus className={`w-8 ${infants >= 5 && 'text-gray-200'}`} />
            </button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Guests;
