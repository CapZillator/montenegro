'use client';

import { FC } from 'react';
import { Marker } from 'react-leaflet';
import L, { LatLngTuple } from 'leaflet';

import { defaultMarkerIcon } from '@/components/common/map/components/default-marker-icon/defaultMarkerIcon';
import { DEFAULT_COORDS } from '@/constants/location';

import { BaseMap } from '../base-map/BaseMap';
import { MapViewUpdater } from '../map-view-updater/MapViewUpdater';

type Props = {
  coordinates?: LatLngTuple;
  className?: string;
  onChange: (coords: LatLngTuple) => void;
};

export const EditableLocationMap: FC<Props> = ({
  coordinates,
  className,
  onChange,
}) => {
  const position =
    coordinates && coordinates.every((coordinate) => coordinate)
      ? coordinates
      : DEFAULT_COORDS;

  const handleDragEnd = (e: L.LeafletEvent) => {
    const marker = e.target as L.Marker;
    const newPos = marker.getLatLng();
    const coords: LatLngTuple = [newPos.lat, newPos.lng];
    onChange(coords);
  };

  return (
    <BaseMap center={position} className={className}>
      <MapViewUpdater center={position} />
      {position && (
        <Marker
          position={position}
          icon={defaultMarkerIcon}
          draggable
          eventHandlers={{ dragend: handleDragEnd }}
        />
      )}
    </BaseMap>
  );
};
