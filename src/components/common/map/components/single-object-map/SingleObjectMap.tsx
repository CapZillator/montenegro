'use client';

import { FC } from 'react';
import { Marker, Popup } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import { BaseMap } from '../base-map/BaseMap';
import { defaultMarkerIcon } from '../default-marker-icon/defaultMarkerIcon';

type Props = {
  location: LatLngTuple;
  title?: string;
  className?: string;
};

export const SingleObjectMap: FC<Props> = ({ location, title, className }) => (
  <BaseMap center={location} zoom={15} className={className}>
    <Marker position={location} icon={defaultMarkerIcon}>
      <Popup>{title || 'Объект недвижимости'}</Popup>
    </Marker>
  </BaseMap>
);
