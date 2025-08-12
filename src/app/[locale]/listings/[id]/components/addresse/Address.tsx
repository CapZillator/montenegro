import { FC } from 'react';

import { Location } from '@/components/common/icons/realty/Location';

type Props = {
  location: string;
  address?: string;
};

export const Address: FC<Props> = async ({ location, address }) => (
  <div className="flex gap-2">
    <Location className="w-5 h-5 fill-primary-content shrink-0" />

    <span className="block">
      {address ? `${location}, ${address}` : location}
    </span>
  </div>
);
