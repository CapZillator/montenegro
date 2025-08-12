import { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import classNames from 'classnames';
import { NearbyAmenities } from '@/types/realEstate';
import { Badge } from '../common/badge/Badge';
import { NEARBY_AMENITIES_ICON_MAP } from '@/constants/ui/badges';

type Props = {
  data: string[];
};

export const Nearby: FC<Props> = async ({ data }) => {
  const t = await getTranslations();
  const nearby = data as NearbyAmenities[];

  return (
    <>
      <h3 className={classNames('my-1 font-semibold', 'lg:text-lg')}>
        {t('listings.properties.nearby')}
      </h3>
      <div className={classNames('flex items-center flex-wrap gap-2')}>
        {nearby.map((badge) => (
          <Badge
            key={badge}
            label={t(`listings.nearbyAmenities.${badge}`)}
            icon={NEARBY_AMENITIES_ICON_MAP[badge]}
          />
        ))}
      </div>
    </>
  );
};
