'use client';

import Map, { NavigationControl, Marker } from 'react-map-gl';
import { getCenter } from 'geolib';

import React, { useState } from 'react';
function LocationBox({ coordinates }) {
  // console.log('Coordinates: ', coordinates);

  return (
    <Map
      mapStyle='mapbox://styles/thanos-webdev/clu847y6100en01pi2dna4xbw'
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: coordinates[0],
        latitude: coordinates[1],
        zoom: 14,
      }}
      //   {...viewState}
      //   onMove={(evt) => setViewState(evt.viewState)}
    >
      <NavigationControl />
      <Marker
        longitude={coordinates[0]}
        latitude={coordinates[1]}
        color='red'
        zoom={8}
      />
    </Map>
  );
}

export default LocationBox;
