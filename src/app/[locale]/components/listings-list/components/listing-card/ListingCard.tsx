import { FC } from 'react';
import { useTranslations } from 'next-intl';
import classNames from 'classnames';

import { ConvertedPrice } from '@/components/common/converted-price/ConvertedPrice';
import {
  AreaIcon,
  BedIcon,
  DoorIcon,
  LocationIcon,
} from '@/components/common/icons';
import { ImageServer } from '@/components/common/image/Image.server';
import { PublishDate } from '@/components/common/publish-date/PublishDate';
import { ResidentialPremises } from '@/types/realEstate';
import { getLocalizedStringValue } from '@/utils/listings';
import { getFullAddress } from '@/utils/listings';

type Props = {
  data: ResidentialPremises;
  locale: string;
};

export const ListingCard: FC<Props> = ({ data, locale }) => {
  const t = useTranslations();

  return (
    <div
      className={classNames(
        'relative flex flex-col gap-2 border-solid border-divider/25 border-1 shadow-md p-2 rounded-lg bg-primary'
      )}
    >
      <ImageServer
        fullUrl={data.images[0]}
        alt="Preview image"
        className="relative w-full aspect-4/3 object-cover rounded-md"
      />
      <div>
        <div className={classNames('flex items-center justify-between gap-2')}>
          <p className={classNames('font-semibold')}>
            <ConvertedPrice amount={data.price} />
          </p>
          <span
            className={classNames(
              'lowercase px-2 bg-primary-content text-primary rounded-sm'
            )}
          >
            {t(`listings.types.${data.listingType}`)}
          </span>
        </div>

        <h3 className={classNames('font-semibold truncate')}>
          {getLocalizedStringValue(data.title, locale)}
        </h3>
        <div className={classNames('flex items-center gap-1')}>
          <LocationIcon
            className={classNames('w-5 h-5 stroke-primary-content')}
          />
          <span className="truncate">
            {getFullAddress(data.location, data.address)}
          </span>
        </div>
      </div>
      <div className={classNames('grid grid-cols-4 text-sm')}>
        <div className={classNames('flex items-center gap-2')}>
          <DoorIcon className={classNames('w-4 h-4 fill-primary-content')} />
          <span>{data.rooms}</span>
        </div>
        <div className={classNames('flex items-center gap-2')}>
          <BedIcon className={classNames('w-4 h-4 stroke-primary-content')} />
          <span>{data.bedrooms}</span>
        </div>
        <div className={classNames('col-span-2 flex items-center gap-2')}>
          <AreaIcon className={classNames('w-4 h-4 fill-primary-content')} />
          <span>
            {data.area} {t('measures.m')}
            <sup>2</sup>
          </span>
        </div>
      </div>
      <PublishDate date={data.updatedAt ?? data.createdAt} />
    </div>
  );
};
