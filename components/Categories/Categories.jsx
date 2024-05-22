'use client';

import { LuTrees } from 'react-icons/lu';
import { PiSwimmingPool } from 'react-icons/pi';
import { MdGridOff } from 'react-icons/md';
import { GiIsland } from 'react-icons/gi';
import { GiCampingTent } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import { FaLandmarkDome } from 'react-icons/fa6';
import { GiWindmill } from 'react-icons/gi';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { MdOutlineCastle } from 'react-icons/md';
import { TbHomeStar } from 'react-icons/tb';
import { PiParkDuotone } from 'react-icons/pi';
import { GiGrapes } from 'react-icons/gi';
import { FaHouseFloodWater } from 'react-icons/fa6';
import { SlPicture } from 'react-icons/sl';
import { LiaRedditAlien } from 'react-icons/lia';
import { MdCabin } from 'react-icons/md';
import { GiPalmTree } from 'react-icons/gi';
import { PiMountains } from 'react-icons/pi';
import { GiTreehouse } from 'react-icons/gi';
import CategoryBox from './CategoryBox';
import { HiOutlineAdjustmentsHorizontal } from 'react-icons/hi2';
import Container from '../Container';
import { usePathname } from 'next/navigation';

export const categories = [
  {
    label: 'Countryside',
    icon: LuTrees,
  },
  {
    label: 'Amazing pools',
    icon: PiSwimmingPool,
  },
  {
    label: 'Off-the-grid',
    icon: MdGridOff,
  },
  {
    label: 'Islands',
    icon: GiIsland,
  },
  {
    label: 'Camping',
    icon: GiCampingTent,
  },
  {
    label: 'Mansions',
    icon: MdOutlineVilla,
  },
  {
    label: 'Domes',
    icon: FaLandmarkDome,
  },
  {
    label: 'Windmills',
    icon: GiWindmill,
  },
  {
    label: 'Beachfront',
    icon: FaUmbrellaBeach,
  },
  {
    label: 'Castles',
    icon: MdOutlineCastle,
  },
  {
    label: 'Historical homes',
    icon: TbHomeStar,
  },
  {
    label: 'National parks',
    icon: PiParkDuotone,
  },
  {
    label: 'Vineyards',
    icon: GiGrapes,
  },
  {
    label: 'Lake',
    icon: FaHouseFloodWater,
  },
  {
    label: 'Amazing views',
    icon: SlPicture,
  },
  {
    label: 'OMG!',
    icon: LiaRedditAlien,
  },
  {
    label: 'Cabins',
    icon: MdCabin,
  },
  {
    label: 'Tropical',
    icon: GiPalmTree,
  },
  {
    label: 'Top of the world',
    icon: PiMountains,
  },
  {
    label: 'Treehouses',
    icon: GiTreehouse,
  },
];

function Categories() {
  const pathname = usePathname();

  return (
    <Container fluid={pathname === '/search'}>
      <div className='flex items-center justify-center gap-8'>
        <div className='overflow-x-auto no-scrollbar'>
          <div className='flex items-center gap-10  w-max'>
            {categories?.map(({ label, icon }) => (
              // <div key={label} className='flex flex-col items-center'>
              //   <Icon size={26}/>
              //   <p className='break-keep'>{label}</p>
              // </div>
              <CategoryBox key={label} label={label} icon={icon} />
            ))}
          </div>
        </div>
        <div>
          <button className='flex p-4 items-center gap-4 border border-[#dddddd] rounded-xl text-[#222222]'>
            {' '}
            <HiOutlineAdjustmentsHorizontal size={26} className='' />{' '}
            <span className='text-sm font-[600]'>Filters</span>
          </button>
        </div>
      </div>
    </Container>
  );
}

export default Categories;
