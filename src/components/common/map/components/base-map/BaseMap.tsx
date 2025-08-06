'use client';

import { FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

import { DEFAULT_COORDS } from '@/constants/location';

type Props = {
  center?: LatLngTuple;
  zoom?: number;
  className?: string;
  children?: React.ReactNode;
};

export const BaseMap: FC<Props> = ({
  center,
  zoom = 13,
  className,
  children,
}) => {
  const position =
    center && center.every((coordinate) => coordinate)
      ? center
      : DEFAULT_COORDS;

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      className={className || 'w-full h-full min-h-24 min-w-24'}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};
