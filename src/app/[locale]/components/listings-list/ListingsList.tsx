import { FC } from 'react';
import { getLocale, getTranslations } from 'next-intl/server';
import classNames from 'classnames';

import { Area } from '@/components/common/icons/realty/Area';
import { Bed } from '@/components/common/icons/realty/Bed';
import { Calendar } from '@/components/common/icons/realty/Calendar';
import { Door } from '@/components/common/icons/realty/Door';
import { Location } from '@/components/common/icons/realty/Location';
import { LocalizedLink } from '@/components/localized-link/LokalizedLink';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { ResidentialPremises } from '@/types/realEstate';
import { getLocalizedStringValue } from '@/utils/listings';
import { getFullAddress } from '@/utils/listings';
import { getRelativeDate } from '@/utils/time';

type Props = {
  data: ResidentialPremises[];
};

export const ListingsList: FC<Props> = async ({ data }) => {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <div
      className={classNames(
        'grid grid-cols-1 gap-3',
        'sm:grid-cols-2',
        'md:grid-cols-3',
        'xl:pl-82',
        '2xl:grid-cols-4',
        '3xl:grid-cols-5'
      )}
    >
      {data.map((listing) => {
        const publishedAtRelative = getRelativeDate(listing.createdAt);

        return (
          <LocalizedLink key={listing.id} href={`/listings/${listing.id}`}>
            <div
              className={classNames(
                'relative flex flex-col gap-2 border-solid border-divider/25 border-1 shadow-md p-2 rounded-lg bg-primary'
              )}
            >
              <img
                src={listing.images[0]}
                alt="Preview image"
                className="relative w-full aspect-4/3 object-cover rounded-md"
              />
              <div>
                <div
                  className={classNames(
                    'flex items-center justify-between gap-2'
                  )}
                >
                  <p className={classNames('font-semibold')}>
                    {formatNumberToFinancialAmount(listing.price)} €
                  </p>
                  <span
                    className={classNames(
                      'lowercase px-2 bg-primary-content text-primary rounded-sm'
                    )}
                  >
                    {t(`listings.types.${listing.listingType}`)}
                  </span>
                </div>

                <h3 className={classNames('font-semibold truncate')}>
                  {getLocalizedStringValue(listing.title, locale)}
                </h3>
                <div className={classNames('flex items-center gap-1')}>
                  <Location
                    className={classNames('w-5 h-5 stroke-primary-content')}
                  />
                  <span className="truncate">
                    {getFullAddress(listing.location, listing.address)}
                  </span>
                </div>
              </div>
              <div className={classNames('grid grid-cols-4 text-sm')}>
                <div className={classNames('flex items-center gap-2')}>
                  <Door
                    className={classNames('w-4 h-4 fill-primary-content')}
                  />
                  <span>{listing.rooms}</span>
                </div>
                <div className={classNames('flex items-center gap-2')}>
                  <Bed
                    className={classNames('w-4 h-4 stroke-primary-content')}
                  />
                  <span>{listing.bedrooms}</span>
                </div>
                <div
                  className={classNames('col-span-2 flex items-center gap-2')}
                >
                  <Area
                    className={classNames('w-4 h-4 fill-primary-content')}
                  />
                  <span>
                    {listing.area} {t('measures.m')}
                    <sup>2</sup>
                  </span>
                </div>
              </div>
              <div className={classNames('flex items-center gap-2')}>
                <Calendar
                  className={classNames('w-4 h-4 stroke-primary-content')}
                />
                <p className="text-sm">
                  {publishedAtRelative.ago
                    ? `${publishedAtRelative.ago} `
                    : null}
                  {
                    <span
                      className={classNames({
                        capitalize: !publishedAtRelative.ago,
                      })}
                    >
                      {t(`date.${publishedAtRelative.i18nKey}`)}
                    </span>
                  }
                  {publishedAtRelative.time
                    ? ` ${publishedAtRelative.time}`
                    : null}
                </p>
              </div>
            </div>
          </LocalizedLink>
        );
      })}
    </div>
  );
};
