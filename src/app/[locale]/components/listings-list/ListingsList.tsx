'use client';

import { FC, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import classNames from 'classnames';

import { fetchListings } from '@/actions/listings';
import { Button } from '@/components/common/button';
import {
  AreaIcon,
  BedIcon,
  CalendarIcon,
  DoorIcon,
  LocationIcon,
} from '@/components/common/icons';
import { ImageServer } from '@/components/common/image/Image.server';
import { LocalizedLink } from '@/components/localized-link/LokalizedLink';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { ResidentialPremisesFilters } from '@/types/filters';
import { ResidentialPremises } from '@/types/realEstate';
import { SortOption } from '@/types/sorting';
import { getLocalizedStringValue } from '@/utils/listings';
import { getFullAddress } from '@/utils/listings';
import { getRelativeDate } from '@/utils/time';

type Props = {
  data: ResidentialPremises[];
  currentPage: number;
  totalPages: number;
  filters: ResidentialPremisesFilters;
  sort: SortOption;
  perPage: number;
};

export const ListingsList: FC<Props> = ({
  data,
  totalPages,
  currentPage,
  filters,
  sort,
  perPage,
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const [listings, setListings] = useState(data);
  const [page, setPage] = useState(currentPage);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (loading || page >= totalPages) return;

    setLoading(true);

    const nextPage = page + 1;
    const { listings: newListings } = await fetchListings(
      filters,
      sort,
      nextPage,
      perPage
    );

    setListings((prev) => [...prev, ...newListings]);
    setPage(nextPage);
    setLoading(false);
  };

  useEffect(() => {
    const fetchInitialListings = async () => {
      setLoading(true);
      const { listings: newListings } = await fetchListings(
        filters,
        sort,
        1,
        perPage
      );
      setListings(newListings);
      setPage(1);
      setLoading(false);
    };

    fetchInitialListings();
  }, [filters, sort, locale, perPage]);

  return (
    <>
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
        {listings.map((listing) => {
          const publishedAtRelative = getRelativeDate(listing.createdAt);

          return (
            <LocalizedLink key={listing.id} href={`/listings/${listing.id}`}>
              <div
                className={classNames(
                  'relative flex flex-col gap-2 border-solid border-divider/25 border-1 shadow-md p-2 rounded-lg bg-primary'
                )}
              >
                <ImageServer
                  fullUrl={listing.images[0]}
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
                    <LocationIcon
                      className={classNames('w-5 h-5 stroke-primary-content')}
                    />
                    <span className="truncate">
                      {getFullAddress(listing.location, listing.address)}
                    </span>
                  </div>
                </div>
                <div className={classNames('grid grid-cols-4 text-sm')}>
                  <div className={classNames('flex items-center gap-2')}>
                    <DoorIcon
                      className={classNames('w-4 h-4 fill-primary-content')}
                    />
                    <span>{listing.rooms}</span>
                  </div>
                  <div className={classNames('flex items-center gap-2')}>
                    <BedIcon
                      className={classNames('w-4 h-4 stroke-primary-content')}
                    />
                    <span>{listing.bedrooms}</span>
                  </div>
                  <div
                    className={classNames('col-span-2 flex items-center gap-2')}
                  >
                    <AreaIcon
                      className={classNames('w-4 h-4 fill-primary-content')}
                    />
                    <span>
                      {listing.area} {t('measures.m')}
                      <sup>2</sup>
                    </span>
                  </div>
                </div>
                <div className={classNames('flex items-center gap-2')}>
                  <CalendarIcon
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

      {page < totalPages && (
        <div className={classNames('mt-5 flex', 'xl:pl-84')}>
          <Button onClick={handleLoadMore} disabled={loading}>
            {t('actions.showMore')}
          </Button>
        </div>
      )}
    </>
  );
};
