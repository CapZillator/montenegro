import { FC } from 'react';
import { Control, Controller } from 'react-hook-form';

import { EditableLocationMap } from '@/components/common/map/components/editable-location-map/EditableLocationMap';

type Props = {
  nameLat: string;
  nameLon: string;
  control: Control<any, any>;
  className?: string;
};

export const ControlledMapInput: FC<Props> = ({
  nameLat,
  nameLon,
  control,
  className,
}) => {
  return (
    <Controller
      control={control}
      name={nameLat}
      render={({ field: { value: lat, onChange: setLat } }) => (
        <Controller
          control={control}
          name={nameLon}
          render={({ field: { value: lon, onChange: setLon } }) => (
            <EditableLocationMap
              coordinates={[lat, lon]}
              className={className}
              onChange={(coords) => {
                setLat(coords[0]);
                setLon(coords[1]);
              }}
            />
          )}
        />
      )}
    />
  );
};
