'use client';

import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngTuple } from 'leaflet';

type Props = {
  center: LatLngTuple;
};

export const MapViewUpdater = ({ center }: Props) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center);
  }, [center, map]);

  return null;
};
