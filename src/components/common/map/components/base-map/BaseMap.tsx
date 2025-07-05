'use client';

import { FC } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression,LatLngTuple } from 'leaflet';

import { DEFAULT_COORDS } from '@/constants/location';

type Props = {
  center?: LatLngExpression;
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
  const fallbackCenter = DEFAULT_COORDS as LatLngTuple;

  return (
    <MapContainer
      center={center ?? fallbackCenter}
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
