'use client';

import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import { DEFAULT_COORDS } from '@/constants/location';

import { BaseMap } from '../base-map/BaseMap';
import { defaultMarkerIcon } from '../default-marker-icon/defaultMarkerIcon';

type Props = {
  location?: LatLngTuple;
  title?: string;
  className?: string;
};

export const SingleObjectMap: FC<Props> = ({ location, title, className }) => {
  const position =
    location && location.every((coordinate) => coordinate)
      ? location
      : DEFAULT_COORDS;

  return (
    <BaseMap center={position} zoom={15} className={className}>
      <Marker position={position} icon={defaultMarkerIcon}>
        <Popup>{title || 'Объект недвижимости'}</Popup>
      </Marker>
    </BaseMap>
  );
};
