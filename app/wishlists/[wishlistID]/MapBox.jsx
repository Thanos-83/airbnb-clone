'use client';

import Map, {
  NavigationControl,
  Marker,
  Popup,
  ScaleControl,
  FullscreenControl,
} from 'react-map-gl';
import { getCenter } from 'geolib';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function SearchMapBox({ rooms }) {
  console.log('Rooms in wishlists: ', rooms);
  const coordinates = rooms.map((room) => ({
    longitude: Number(room.coordinates.long),
    latitude: Number(room.coordinates.lat),
  }));

  const center = getCenter(coordinates);
  // console.log('Rooms: ', rooms);
  // console.log('Coordinates: ', coordinates);
  // console.log('Center: ', center);
  const [popupInfo, setPopupInfo] = useState(null);

  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 7,
  });
  return (
    <Map
      mapStyle='mapbox://styles/thanos-webdev/clu847y6100en01pi2dna4xbw'
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapLib={import('mapbox-gl')}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}>
      <NavigationControl />
      <ScaleControl />
      <FullscreenControl position='top-left' />
      {rooms.map((room) => (
        <Marker
          key={room._id}
          longitude={room.coordinates.long}
          latitude={room.coordinates.lat}
          color='red'
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(room);
          }}>
          <p className='bg-white py-1 p-3 rounded-3xl shadow-md font-semibold cursor-pointer'>
            € {room.price}
          </p>
        </Marker>
      ))}
      {/* <Marker
        longitude={center.longitude}
        latitude={center.latitude}
        color='green'
      /> */}

      {popupInfo && (
        <Popup
          anchor='top'
          longitude={popupInfo.coordinates.long}
          latitude={popupInfo.coordinates.lat}
          onClose={() => setPopupInfo(null)}
          className='p-0'>
          <Link href={`/rooms/${popupInfo.id}`} target='_blank'>
            <Image
              width={600}
              height={400}
              alt={popupInfo.name}
              src={popupInfo.image}
              className='aspect-[4/3] object-cover'
            />
            <div className='p-2'>
              <p className='font-semibold'>{popupInfo.name}</p>
            </div>
          </Link>
        </Popup>
      )}
    </Map>
  );
}

export default SearchMapBox;
