import { FC } from 'react';
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
import { ImageClient } from '@/components/common/image/Image.client';
import { ImageButton } from '@/components/common/image-button/ImageButton';
import { ListingState } from '@/enums/listing';
import { isoUTCStringToLocaleString } from '@/formatters/date';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { useConvertedPrice } from '@/hooks/use-converted-price/useConvertedPrice';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { ResidentialPremises } from '@/types/realEstate';
import { getFullAddress, getLocalizedStringValue } from '@/utils/listings';

type Props = {
  listing: ResidentialPremises;
  onOpen: (id: string) => void;
  onChangeState: (id: string, state: ListingState) => void;
  onDelete: (id: string) => void;
  isDisabled?: boolean;
};

export const Listing: FC<Props> = ({
  listing,
  onOpen,
  onChangeState,
  onDelete,
  isDisabled,
}) => {
  const { t } = useTranslation();
  const locale = useLocale();
  const isActive = listing.state === ListingState.ACTIVE;
  const convertedPrice = useConvertedPrice(listing.price);

  return (
    <div
      className={classNames(
        'relative flex flex-col gap-2 border-solid border-divider/25 border-1 shadow-md p-2 rounded-lg',
        {
          'bg-primary': isActive,
        }
      )}
    >
      <div className="relative">
        <ImageClient
          fullUrl={listing.images[0]}
          alt="Preview image"
          className={classNames(
            'relative w-full aspect-4/3 object-cover rounded-md',
            {
              'opacity-50': !isActive,
            }
          )}
        />
        {!isActive && (
          <InvisibleIcon className="absolute top-1/2 left-1/2 -translate-1/2 w-1/5 h-1/5 fill-primary-content" />
        )}
      </div>

      <div className={classNames({ 'opacity-50': !isActive })}>
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold">
            {formatNumberToFinancialAmount(convertedPrice.price)}{' '}
            {convertedPrice.currencySymbol}
          </p>
          <span className="lowercase py-0.5 px-2 bg-primary-content text-primary rounded-sm">
            {t(`listings.types.${listing.listingType}`)}
          </span>
        </div>

        <h3 className="font-semibold truncate">
          {getLocalizedStringValue(listing.title, locale)}
        </h3>

        <div className="flex items-center gap-1">
          <LocationIcon className="w-5 h-5 stroke-primary-content" />
          <span className="truncate">
            {getFullAddress(listing.location, listing.address)}
          </span>
        </div>
      </div>

      <div
        className={classNames('grid grid-cols-4 text-sm', {
          'opacity-50': !isActive,
        })}
      >
        <div className="flex items-center gap-2">
          <DoorIcon className="w-4 h-4 fill-primary-content" />
          <span>{listing.rooms}</span>
        </div>
        <div className="flex items-center gap-2">
          <BedIcon className="w-4 h-4 stroke-primary-content" />
          <span>{listing.bedrooms}</span>
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <AreaIcon className="w-4 h-4 fill-primary-content" />
          <span>
            {listing.area} {t('measures.m')}
            <sup>2</sup>
          </span>
        </div>
      </div>

      <div
        className={classNames('flex items-center gap-2', {
          'opacity-50': !isActive,
        })}
      >
        <CalendarIcon className="w-4 h-4 stroke-primary-content" />
        <span className="text-sm">
          {isoUTCStringToLocaleString(listing.createdAt)}
        </span>
      </div>

      <div className="absolute top-4 left-4 right-4 flex justify-end gap-2">
        <ImageButton
          onClick={() => onChangeState(listing.id, listing.state)}
          isDisabled={isDisabled}
        >
          {isActive ? (
            <InvisibleIcon className="w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary" />
          ) : (
            <VisibleIcon className="w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary" />
          )}
        </ImageButton>

        <ImageButton onClick={() => onOpen(listing.id)} isDisabled={isDisabled}>
          <EditIcon className="w-5 h-5 fill-primary-content duration-300 group-hover:fill-primary" />
        </ImageButton>

        <ImageButton
          onClick={() => onDelete(listing.id)}
          isDisabled={isDisabled}
        >
          <DeleteStrokeIcon className="w-5 h-5 stroke-primary-content duration-300 group-hover:stroke-primary" />
        </ImageButton>
      </div>
    </div>
  );
};
