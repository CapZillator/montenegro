import { FC, useState } from 'react';
import { useLocale } from 'next-intl';
import classNames from 'classnames';

import {
  AreaIcon,
  BedIcon,
  CalendarIcon,
  DeleteStrokeIcon,
  DoorIcon,
  EditIcon,
  InvisibleIcon,
  LocationIcon,
  VisibleIcon,
} from '@/components/common/icons';
import { ImageButton } from '@/components/common/image-button/ImageButton';
import { Dropdown } from '@/components/common/inputs';
import { ListingState } from '@/enums/listing';
import { isoUTCStringToLocaleString } from '@/formatters/date';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { ResidentialPremises } from '@/types/realEstate';
import { getFullAddress, getLocalizedStringValue } from '@/utils/listings';

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
  const locale = useLocale();
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
          <div
            key={listing.id}
            className={classNames(
              'relative flex flex-col gap-2 border-solid border-divider/25 border-1 shadow-md p-2 rounded-lg',
              {
                'bg-primary': listing.state === ListingState.ACTIVE,
              }
            )}
          >
            <img
              src={listing.images[0]}
              alt="Preview image"
              className={classNames(
                'relative w-full aspect-4/3 object-cover rounded-md',
                {
                  'opacity-50': listing.state !== ListingState.ACTIVE,
                }
              )}
            />
            <div
              className={classNames({
                'opacity-50': listing.state !== ListingState.ACTIVE,
              })}
            >
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
                    'lowercase py-0.5 px-2 bg-primary-content text-primary rounded-sm'
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
            <div
              className={classNames('grid grid-cols-4 text-sm', {
                'opacity-50': listing.state !== ListingState.ACTIVE,
              })}
            >
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
              <div className={classNames('col-span-2 flex items-center gap-2')}>
                <AreaIcon
                  className={classNames('w-4 h-4 fill-primary-content')}
                />
                <span>
                  {listing.area} {t('measures.m')}
                  <sup>2</sup>
                </span>
              </div>
            </div>
            <div
              className={classNames('flex items-center gap-2', {
                'opacity-50': listing.state !== ListingState.ACTIVE,
              })}
            >
              <CalendarIcon
                className={classNames('w-4 h-4 stroke-primary-content')}
              />
              <span className="text-sm">
                {isoUTCStringToLocaleString(listing.createdAt)}
              </span>
            </div>
            <div
              className={classNames(
                'absolute top-4 left-4 right-4 flex justify-end gap-2'
              )}
            >
              <ImageButton
                onClick={() => onChangeState(listing.id, listing.state)}
                isDisabled={isDisabled}
              >
                {listing.state === ListingState.ACTIVE ? (
                  <InvisibleIcon
                    className={classNames(
                      'w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary'
                    )}
                  />
                ) : (
                  <VisibleIcon
                    className={classNames(
                      'w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary'
                    )}
                  />
                )}
              </ImageButton>
              <ImageButton
                onClick={() => onOpenListing(listing.id)}
                isDisabled={isDisabled}
              >
                <EditIcon
                  className={classNames(
                    'w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary'
                  )}
                />
              </ImageButton>
              <ImageButton
                onClick={() => onDeleteListing(listing.id)}
                isDisabled={isDisabled}
              >
                <DeleteStrokeIcon
                  className={classNames(
                    'w-5 h-5 stroke-primary-content duration-300 group-hover:stroke-primary'
                  )}
                />
              </ImageButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
