'use client';

import Map, { NavigationControl, Marker } from 'react-map-gl';
import { getCenter } from 'geolib';

import React, { useState } from 'react';
function MapBox({ rooms }) {
  const coordinates = rooms.map((room) => ({
    longitude: Number(room.coordinates.long),
    latitude: Number(room.coordinates.lat),
  }));

  const center = getCenter(coordinates);
  // console.log('Rooms: ', rooms);
  // console.log('Coordinates: ', coordinates);
  // console.log('Center: ', center);

  const [viewState, setViewState] = useState({
    longitude: center.longitude,
    latitude: center.latitude,
    zoom: 10,
  });
  return (
    <Map
      mapStyle='mapbox://styles/thanos-webdev/clu847y6100en01pi2dna4xbw'
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapLib={import('mapbox-gl')}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}>
      <NavigationControl />
      {rooms.map((room) => (
        <Marker
          key={room._id}
          longitude={room.coordinates.long}
          latitude={room.coordinates.lat}
          color='red'
        />
      ))}
      <Marker
        longitude={center.longitude}
        latitude={center.latitude}
        color='green'
      />
    </Map>
  );
}

export default MapBox;
