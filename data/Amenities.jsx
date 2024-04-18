import Ac from '@/svg/ameneties/ac';
import Bbq from '@/svg/ameneties/bbq';
import Beach from '@/svg/ameneties/beach';
import CarbonMonoxideAlarm from '@/svg/ameneties/carbon-monoxide-alarm';
import FireExt from '@/svg/ameneties/fire-ext';
import FirePit from '@/svg/ameneties/fire-pit';
import FirstAid from '@/svg/ameneties/first-aid';
import Gym from '@/svg/ameneties/gym';
import HotTub from '@/svg/ameneties/hot-tub';
import IndoorFirplace from '@/svg/ameneties/indoor-firplace';
import Kitchen from '@/svg/ameneties/kitchen';
import Lake from '@/svg/ameneties/lake';
import OutdoorDining from '@/svg/ameneties/outdoor-dining';
import OutdoorShower from '@/svg/ameneties/outdoor-shower';
import PaidParking from '@/svg/ameneties/paid-parking';
import Parking from '@/svg/ameneties/parking';
import Patio from '@/svg/ameneties/patio';
import Piano from '@/svg/ameneties/piano';
import Pool from '@/svg/ameneties/pool';
import PoolTable from '@/svg/ameneties/pool-table';
import Ski from '@/svg/ameneties/ski';
import SmokeAlarm from '@/svg/ameneties/smoke-alarm';
import Tv from '@/svg/ameneties/tv';
import WashingMachine from '@/svg/ameneties/washing-machine';
import Wifi from '@/svg/ameneties/wifi';
import Workplace from '@/svg/ameneties/workplace';

export const AmenetiesType = [
  {
    type: 'basic',
    data: [
      { name: 'Wifi', svgPath: <Wifi /> },
      { name: 'TV', svgPath: <Tv /> },
      { name: 'Kitchen', svgPath: <Kitchen /> },
      { name: 'Washing Machine', svgPath: <WashingMachine /> },
      { name: 'Free parking on premises', svgPath: <Parking /> },
      { name: 'Paid parking on premises', svgPath: <PaidParking /> },
      { name: 'Air conditioning', svgPath: <Ac /> },
      { name: 'Dedicated workplace', svgPath: <Workplace /> },
    ],
  },
  {
    type: 'advanced',
    data: [
      { name: 'Pool', svgPath: <Pool /> },
      { name: 'Hot tub', svgPath: <HotTub /> },
      { name: 'Patio', svgPath: <Patio /> },
      { name: 'BBQ grill', svgPath: <Bbq /> },
      { name: 'Outdoor dining area', svgPath: <OutdoorDining /> },
      { name: 'Fire pit', svgPath: <FirePit /> },
      { name: 'Pool table', svgPath: <PoolTable /> },
      { name: 'Indoor fireplace', svgPath: <IndoorFirplace /> },
      { name: 'Piano', svgPath: <Piano /> },
      { name: 'Exercise equipment', svgPath: <Gym /> },
      { name: 'Lake access', svgPath: <Lake /> },
      { name: 'Beach access', svgPath: <Beach /> },
      { name: 'Ski-in/Ski-out', svgPath: <Ski /> },
      { name: 'Outdoor shower', svgPath: <OutdoorShower /> },
    ],
  },
  {
    type: 'safety',
    data: [
      { name: 'Smoke alarm', svgPath: <SmokeAlarm /> },
      { name: 'First aid kit', svgPath: <FirstAid /> },
      { name: 'Fire extinguisher', svgPath: <FireExt /> },
      { name: 'Carbon monoxide alarm', svgPath: <CarbonMonoxideAlarm /> },
    ],
  },
];
