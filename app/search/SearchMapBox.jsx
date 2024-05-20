'use client';

import Map, {
  NavigationControl,
  Marker,
  Popup,
  ScaleControl,
  FullscreenControl,
  GeolocateControl,
} from 'react-map-gl';
import { getCenter } from 'geolib';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
function SearchMapBox({ rooms }) {
  const searchParams = useSearchParams();

  const coordinates = rooms.map((room) => ({
    longitude: Number(room.address.location.coordinates[0]),
    latitude: Number(room.address.location.coordinates[1]),
  }));

  const center = getCenter(coordinates);
  // console.log('Rooms: ', rooms);
  // console.log('Coordinates: ', coordinates);
  // console.log('Center: ', center);
  const [popupInfo, setPopupInfo] = useState(null);
  const [mapLoading, setMapLoading] = useState(false);
  const mapRef = useRef(null);

  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 10,
  });

  useEffect(() => {
    mapRef.current?.flyTo({
      center: [center.longitude, center.latitude],
      zoom: 10,
      duration: 1000,
    });
  }, [center.longitude, center.latitude]);
  // console.log('View State: ', center);

  return (
    <Map
      mapStyle='mapbox://styles/thanos-webdev/clu847y6100en01pi2dna4xbw'
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapLib={import('mapbox-gl')}
      ref={mapRef}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      // onPitch={(e) => console.log('Pitch: ', e.viewState.pitch)}
      onMoveStart={(e) => setMapLoading(true)}
      onMoveEnd={(e) => setMapLoading(false)}
      // onZoom={(e) => console.log('Zoom: ', e.viewState.zoom)}
      onLoad={(e) => console.log('On Load: ', e.target)}
      // onRender={(e) => console.log('On Render: ', e.target)}
      // onRotate={(e) => console.log('Rotate: ', e.viewState.bearing)}
    >
      <NavigationControl />
      <ScaleControl />
      <FullscreenControl position='top-left' />
      <GeolocateControl />
      {mapLoading && (
        <div class='mapbox_spinner lds-ellipsis'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
      {rooms.map((room) => (
        <Marker
          key={room._id}
          longitude={room.address.location.coordinates[0]}
          latitude={room.address.location.coordinates[1]}
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
          longitude={popupInfo.address.location.coordinates[0]}
          latitude={popupInfo.address.location.coordinates[1]}
          onClose={() => setPopupInfo(null)}
          className='p-0'>
          <Link href={`/rooms/${popupInfo._id}`} target='_blank'>
            <Image
              width={600}
              height={400}
              alt={popupInfo.name}
              src={popupInfo.images.picture_url}
              className='aspect-[4/3] object-cover'
            />
            <div className='p-2'>
              <p className='font-semibold'>
                {popupInfo.property_type} in {searchParams.get('location')}
              </p>
            </div>
          </Link>
        </Popup>
      )}
    </Map>
  );
}

export default SearchMapBox;
