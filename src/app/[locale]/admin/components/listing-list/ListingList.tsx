import { FC, useState } from 'react';
import classNames from 'classnames';

import { Dropdown } from '@/components/common/inputs';
import { ListingState } from '@/enums/listing';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { ResidentialPremises } from '@/types/realEstate';

import { Listing } from './components/listing/Listing';
import { SortOption } from './enums';
import { useSortedListings } from './useSortedListings';

type Props = {
  onOpenListing: (id: string) => void;
  onChangeVisibility: (id: string, state: ListingState) => void;
  onDeleteListing: (id: string) => void;
  listings?: ResidentialPremises[];
  isDisabled?: boolean;
};

export const ListingList: FC<Props> = ({
  onOpenListing,
  onChangeVisibility,
  onDeleteListing,
  listings,
  isDisabled,
}) => {
  const [sortBy, setSortBy] = useState(SortOption.NEWEST);
  const { t } = useTranslation();

  const onChangeState = (id: string, state: ListingState) => {
    if (state === ListingState.ACTIVE || state === ListingState.PAUSED) {
      onChangeVisibility(
        id,
        state === ListingState.ACTIVE
          ? ListingState.PAUSED
          : ListingState.ACTIVE
      );
    }
  };

  const onSortByUpdate = (
    value: string | boolean | Array<string | boolean>
  ) => {
    const sort = value as SortOption;
    setSortBy(sort);
  };

  const sortedListings = useSortedListings(listings, sortBy);

  const sortOptionValues = [
    { name: t('sorting.new'), value: SortOption.NEWEST },
    { name: t('sorting.old'), value: SortOption.OLDEST },
    { name: t('sorting.active'), value: SortOption.ACTIVE },
    { name: t('sorting.inactive'), value: SortOption.INACTIVE },
  ];

  return (
    <>
      <div className="flex items-end justify-between px-2 mb-3 flex-wrap gap-1">
        <h1
          className={classNames(
            'hidden text-xl font-semibold',
            'md:block',
            'lg:text-2xl'
          )}
        >
          {t('user.myListings')}
        </h1>
        <Dropdown
          selectedValue={sortBy}
          values={sortOptionValues}
          onUpdate={onSortByUpdate}
          controlButtonStyles={classNames('min-w-40')}
        />
      </div>

      <div
        className={classNames(
          'grid grid-cols-1 gap-2',
          'sm:grid-cols-2',
          'lg:grid-cols-3 lg:gap-3',
          'xl:grid-cols-4'
        )}
      >
        {sortedListings?.map((listing) => (
          <Listing
            key={listing.id}
            listing={listing}
            onOpen={onOpenListing}
            onChangeState={onChangeState}
            onDelete={onDeleteListing}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </>
  );
};
