import { FC } from 'react';
import { getTranslations } from 'next-intl/server';
import classNames from 'classnames';

import {
  AreaIcon,
  BathIcon,
  BedIcon,
  DoorIcon,
  StairsIcon,
} from '@/components/common/icons';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { ResidentialPremises } from '@/types/realEstate';

import { Property } from './components/property/Property';

export const Summary: FC<ResidentialPremises> = async ({
  area,
  rooms,
  bedrooms,
  bathrooms,
  floor,
  totalFloors,
}) => {
  const t = await getTranslations();

  return (
    <div
      className={classNames(
        'grid border-solid border-divider/25 border-1 py-2 px-3 rounded-lg bg-primary text-sm',
        'md:text-lg',
        {
          'grid-cols-[1.2fr_repeat(3,1fr)] md:grid-cols-4 2xl:grid-cols-5':
            !floor || !totalFloors,
          'grid-cols-[1.5fr_repeat(4,1fr)] md:grid-cols-5 2xl:grid-cols-6':
            floor && totalFloors && area < 100,
          'grid-cols-[1.75fr_repeat(4,1fr)] md:grid-cols-5 2xl:grid-cols-6':
            floor && totalFloors && area > 100,
        }
      )}
    >
      <Property
        icon={
          <AreaIcon
            className={classNames(
              'w-4 h-4 fill-primary-content',
              'md:w-5 md:h-5'
            )}
          />
        }
        className="gap-2 md:gap-3"
        label={t('listings.properties.area')}
      >
        {formatNumberToFinancialAmount(area)} {t('measures.m')}
        <sup>2</sup>
      </Property>

      <Property
        icon={
          <DoorIcon
            className={classNames(
              'w-4 h-4 fill-primary-content',
              'md:w-5 md:h-5'
            )}
          />
        }
        label={t('listings.properties.rooms')}
      >
        {rooms}
      </Property>

      <Property
        icon={
          <BedIcon
            className={classNames(
              'w-4 h-4 fill-primary-content',
              'md:w-5 md:h-5'
            )}
          />
        }
        label={t('listings.properties.bedrooms')}
      >
        {bedrooms}
      </Property>

      <Property
        icon={
          <BathIcon
            className={classNames(
              'w-4 h-4 fill-primary-content',
              'md:w-5 md:h-5'
            )}
          />
        }
        label={t('listings.properties.bathrooms')}
      >
        {bathrooms}
      </Property>

      {floor && totalFloors ? (
        <Property
          icon={
            <StairsIcon
              className={classNames(
                'w-4 h-4 fill-primary-content',
                'md:w-5 md:h-5'
              )}
            />
          }
          label={t('listings.properties.floor')}
        >
          {floor}/{totalFloors}
        </Property>
      ) : null}
    </div>
  );
};
