'use client';

import { FC } from 'react';
import dynamic from 'next/dynamic';
import { LatLngTuple } from 'leaflet';

const ClientMap = dynamic(
  () =>
    import(
      '@/components/common/map/components/single-object-map/SingleObjectMap'
    ).then((mod) => mod.SingleObjectMap),
  {
    ssr: false,
    loading: () => <div className="h-96">Загрузка карты...</div>,
  }
);

type Props = {
  className: string;
  location: LatLngTuple;
};

export const Map: FC<Props> = ({ className, location }) => (
  <ClientMap {...{ location, className }} />
);
