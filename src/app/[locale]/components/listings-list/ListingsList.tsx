'use client';

import { FC, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import classNames from 'classnames';

import { fetchListings } from '@/actions/listings';
import { Button } from '@/components/common/button';
import { LocalizedLink } from '@/components/localized-link/LokalizedLink';
import { ResidentialPremisesFilters } from '@/types/filters';
import { ResidentialPremises } from '@/types/realEstate';
import { SortOption } from '@/types/sorting';
import { ListingCard } from './components/listing-card/ListingCard';

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
          'lg:grid-cols-3',
          'xl:pl-82',
          '2xl:grid-cols-4',
          '3xl:grid-cols-5'
        )}
      >
        {listings.map((listing) => (
          <LocalizedLink key={listing.id} href={`/listings/${listing.id}`}>
            <ListingCard data={listing} locale={locale} />
          </LocalizedLink>
        ))}
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
