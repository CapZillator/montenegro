'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import classNames from 'classnames';

import { Accordion } from '@/components/common/accordion/Accordion';
import { Button } from '@/components/common/button/Button';
import { ButtonIcon } from '@/components/common/button/enums';
import {
  ControlledDropdown,
  ControlledRangeSlider,
  ControlledSwitcher,
  MoneyInput,
  NumericInput,
} from '@/components/common/controlled-inputs';
import {
  AirConditionerIcon,
  AreaIcon,
  ArmchairIcon,
  BathIcon,
  BedIcon,
  CalendarIcon,
  CityIcon,
  CloseIcon,
  DealIcon,
  DoorIcon,
  FilterIcon,
  LocationIcon,
  ParkingIcon,
  PetsIcon,
  StairsIcon,
  WalletIcon,
} from '@/components/common/icons';
import { LOCALIZED_CITIES } from '@/constants/location';
import { ListingType, ResidentialPremisesType } from '@/enums/listing';
import { useLocale } from '@/hooks/use-locale/useLocale';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { useWindowSize } from '@/hooks/use-window-size/useWindowSize';
import { ResidentialPremisesFilters } from '@/types/filters';
import { parseSearchParamsToFilters } from '@/utils/filters';

import { DEFAULT_FILTERS_BAR_STATE, DEFAULT_VALUES } from './constants';

export function FiltersForm() {
  const [filtersBarState, setFiltersBarState] = useState(
    DEFAULT_FILTERS_BAR_STATE
  );
  const router = useRouter();
  const searchParamsRaw = useSearchParams();
  const { t } = useTranslation();
  const { control, reset, watch, handleSubmit } =
    useForm<ResidentialPremisesFilters>({
      defaultValues: DEFAULT_VALUES,
    });
  const { isDesktop, isLargeDesktop } = useWindowSize();
  const currentLocale = useLocale();
  const listingType = watch('listingType');
  const isLongTermRent =
    listingType && listingType === ListingType.LONG_TERM_RENT;

  const onSubmit = (data: any) => {
    const searchParams = new URLSearchParams(searchParamsRaw.toString());
    const filterKeys = Object.keys(DEFAULT_VALUES);

    filterKeys.forEach((key) => {
      searchParams.delete(key);
    });

    Object.entries(
      isLongTermRent ? data : { ...data, petsAllowed: null }
    ).forEach(([key, value]) => {
      if (Array.isArray(value) && !value.length) return;
      if (value !== null && value !== undefined && value !== '') {
        searchParams.set(key, value.toString());
      }
    });

    if (!isDesktop && !isLargeDesktop) {
      setFiltersBarState({ ...filtersBarState, isMainOpen: false });
    }

    router.push(`?${searchParams.toString()}`);
  };

  useEffect(() => {
    const filtersFromParams = parseSearchParamsToFilters(
      Object.fromEntries(searchParamsRaw.entries())
    );
    reset({ ...DEFAULT_VALUES, ...filtersFromParams });
  }, [searchParamsRaw, reset]);

  const onReset = () => {
    reset();
    const params = new URLSearchParams(searchParamsRaw.toString());

    const sort = params.get('sort');
    const newParams = new URLSearchParams();
    if (sort) {
      newParams.set('sort', sort);
    }

    router.push(`?${newParams.toString()}`);
  };

  const realEstateTypeDropdownOptions = Object.values(
    ResidentialPremisesType
  ).map((value) => ({
    name: t(`realEstate.types.${value}`),
    value: value,
  }));

  const listingTypeDropdownOptions = Object.values(ListingType).map(
    (value) => ({
      name: t(`listings.types.${value}`),
      value: value,
    })
  );

  const locations = LOCALIZED_CITIES[currentLocale];

  return (
    <>
      <button
        onClick={() =>
          setFiltersBarState({
            ...filtersBarState,
            isMainOpen: !filtersBarState.isMainOpen,
          })
        }
        className={classNames(
          'px-3 py-2 flex items-center gap-1.5 border-solid border-1 border-divider/25 rounded-sm text-sm shadow-md uppercase bg-primary',
          'xl:hidden'
        )}
      >
        <FilterIcon className="w-4.5 h-4.5 stroke-primary-content" />
        <span>{t('actions.filters')}</span>
      </button>
      <form
        className={classNames(
          'fixed flex flex-col bg-primary left-0 top-12 bottom-0 right-0 px-4 pt-5 pb-5 z-10 -translate-x-full duration-300 overflow-y-auto scrollbar shadow-md',
          'md:max-w-100',
          'xl:w-80 xl:-translate-x-2 xl:right-auto xl:left-auto xl:pl-2 xl:pr-5 xl:pt-8 xl:bg-neutral xl:shadow-none',
          { 'translate-x-0': filtersBarState.isMainOpen }
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={classNames(
            'flex items-center justify-between mb-1',
            'xl:hidden'
          )}
        >
          <h4 className="text-lg font-semibold">{t('filters.label')}</h4>
          <button
            type="button"
            onClick={() =>
              setFiltersBarState({ ...filtersBarState, isMainOpen: false })
            }
            className={classNames('cursor-pointer')}
          >
            <CloseIcon className="w-6 h-6 fill-primary-content duration-300 hover:fill-secondary-content" />
          </button>
        </div>

        <div className={classNames('grid grid-cols-2 gap-x-3 gap-y-2  mb-3')}>
          <ControlledDropdown
            name={'propertyType'}
            control={control}
            values={realEstateTypeDropdownOptions}
            controlButtonStyles="w-full"
            label={t('filters.type')}
            icon={<CityIcon className="w-5 h-5 stroke-primary-content" />}
          />
          <ControlledDropdown
            name={'listingType'}
            control={control}
            values={listingTypeDropdownOptions}
            controlButtonStyles="w-full"
            label={t('filters.listingType')}
            icon={<DealIcon className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledDropdown
            name={'location'}
            control={control}
            values={locations}
            controlButtonStyles="w-full"
            label={t('filters.place')}
            searchEnabled
            icon={<LocationIcon className="w-5 h-5 stroke-primary-content" />}
          />
        </div>

        <div className="mb-3">
          <div className="flex gap-1.5 items-center mb-1">
            <WalletIcon
              className={classNames('w-5 h-5 stroke-primary-content')}
            />
            <p>{t('listings.properties.price')}</p>
          </div>
          <div className="flex gap-2 items-center">
            <MoneyInput name={'priceFrom'} control={control} />
            <div className="w-5 h-0.5 bg-primary-content" />
            <MoneyInput name={'priceTo'} control={control} />
          </div>
        </div>

        <div className="mb-3">
          <div className="flex gap-1.5 items-center mb-1">
            <AreaIcon className={classNames('w-5 h-5 fill-primary-content')} />
            <p>{t('listings.properties.area')}</p>
          </div>
          <div className="flex gap-2 items-center">
            <NumericInput
              name={'areaFrom'}
              control={control}
              measurementUnitBadge={
                <>
                  {t('measures.m')}
                  <sup>2</sup>
                </>
              }
            />
            <div className="w-5 h-0.5 bg-primary-content" />
            <NumericInput
              name={'areaTo'}
              control={control}
              measurementUnitBadge={
                <>
                  {t('measures.m')}
                  <sup>2</sup>
                </>
              }
            />
          </div>
        </div>

        <div className="space-y-1 mb-3">
          <ControlledRangeSlider
            nameFrom="roomsFrom"
            nameTo="roomsTo"
            control={control}
            label={t('listings.properties.rooms')}
            max={9}
            icon={<DoorIcon className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledRangeSlider
            control={control}
            max={7}
            label={t('listings.properties.bedrooms')}
            nameFrom="bedroomsFrom"
            nameTo="bedroomsTo"
            icon={<BedIcon className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledRangeSlider
            control={control}
            max={5}
            label={t('listings.properties.bathrooms')}
            nameFrom="bathroomsFrom"
            nameTo="bathroomsTo"
            icon={<BathIcon className="w-5 h-5 fill-primary-content" />}
          />
        </div>

        <div className="w-full">
          <Accordion
            title={
              filtersBarState.isAdditionalOpen
                ? t('actions.showLessParams')
                : t('actions.showMoreParams')
            }
            isOpen={filtersBarState.isAdditionalOpen}
            onOpenChange={() =>
              setFiltersBarState({
                ...filtersBarState,
                isAdditionalOpen: !filtersBarState.isAdditionalOpen,
              })
            }
          >
            <div className="mb-3">
              <div className="flex gap-1.5 items-center mb-1">
                <StairsIcon
                  className={classNames('w-5 h-5 fill-primary-content')}
                />
                <p>{t('listings.properties.floor')}</p>
              </div>
              <div className="flex gap-2 items-center">
                <NumericInput name={'floorFrom'} control={control} />
                <div className="w-5 h-0.5 bg-primary-content" />
                <NumericInput name={'floorTo'} control={control} />
              </div>
            </div>

            <div className="mb-3">
              <div className="flex gap-1.5 items-center mb-1">
                <CalendarIcon
                  className={classNames('w-5 h-5 stroke-primary-content')}
                />
                <p>{t('listings.properties.buildingYear')}</p>
              </div>
              <div className="flex gap-2 items-center">
                <NumericInput name={'buildingYearFrom'} control={control} />
                <div className="w-5 h-0.5 bg-primary-content" />
                <NumericInput name={'buildingYearTo'} control={control} />
              </div>
            </div>

            <div className={classNames('grid grid-cols-2 gap-x-8 gap-y-2')}>
              <ControlledSwitcher
                control={control}
                name="furnished"
                label={t('listings.properties.furnished')}
                icon={<ArmchairIcon className="w-5 h-5 fill-primary-content" />}
              />
              <ControlledSwitcher
                control={control}
                name="parking"
                label={t('listings.properties.parking')}
                icon={<ParkingIcon className="w-5 h-5 fill-primary-content" />}
              />
              <ControlledSwitcher
                control={control}
                name="airConditioner"
                label={t('listings.properties.ac')}
                icon={
                  <AirConditionerIcon className="w-5 h-5 fill-primary-content" />
                }
              />
              {isLongTermRent ? (
                <ControlledSwitcher
                  name={'petsAllowed'}
                  control={control}
                  label={t('listings.properties.petsAllowed')}
                  icon={<PetsIcon className="w-5 h-5 fill-primary-content" />}
                />
              ) : null}
            </div>
          </Accordion>
        </div>

        <div className="mt-3 flex gap-3 items-center">
          <Button
            type="button"
            onClick={onReset}
            icon={ButtonIcon.RESET}
            iconClassName="w-4.5 h-4.5"
          >
            {t('actions.reset')}
          </Button>
          <Button
            type="submit"
            icon={ButtonIcon.FILTER}
            iconClassName="w-4.5 h-4.5"
          >
            {t('actions.apply')}
          </Button>
        </div>
      </form>
    </>
  );
}
