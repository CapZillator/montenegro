import { FC, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import { Button, ButtonIcon } from '@/components/common/button';
import {
  ControlledDropdown,
  ControlledMapInput,
  ControlledSwitcher,
  ImageUploader,
  MoneyInput,
  MultilingualTextarea,
  MultilingualTextInput,
  NumericInput,
  TextInput,
} from '@/components/common/controlled-inputs';
import { FormNavigation } from '@/components/common/form-navigation/FormNavigation';
import {
  AddressIcon,
  AirConditionerIcon,
  AreaIcon,
  ArmchairIcon,
  BathIcon,
  BedIcon,
  CalendarIcon,
  DoorIcon,
  LanguageIcon,
  LocationIcon,
  ParkingIcon,
  PetsIcon,
  PriceIcon,
  StairsIcon,
  WalletIcon,
} from '@/components/common/icons';
import { Dropdown } from '@/components/common/inputs/dropdown/Dropdown';
import { UserContactsModal } from '@/components/common/user-contacts-modal/UserContactsModal';
import { queryKeys } from '@/constants/fetch';
import { AVAILABLE_LOCALES } from '@/constants/i18n';
import { LOCALIZED_CITIES } from '@/constants/location';
import { validationSchema } from '@/constants/validationSchemas';
import { ListingType, ResidentialPremisesType } from '@/enums/listing';
import { geocodeAddress } from '@/fetchers/geo';
import { addListingFetcher, updateListingFetcher } from '@/fetchers/listings';
import { useCurrentUser } from '@/hooks/use-current-user/useCurrentUser';
import { useLocale } from '@/hooks/use-locale/useLocale';
import { useToast } from '@/hooks/use-toast/useToast';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { ResidentialPremises } from '@/types/realEstate';

import { HeaderNavigation } from './components/header-navigation/HeaderNavigation';
import {
  DEFAULT_RESIDENTIAL_PREMISE_DATA,
  HOUSES,
  INIT_FORM_STEP,
  STEP_FIELDS,
  TOTAL_FORM_STEPS,
} from './constants';
import { normalizeListingData } from './utils';

type Props = {
  onClose: () => void;
  initialListing?: Omit<
    ResidentialPremises,
    'userId' | 'state' | 'createdAt' | 'updatedAt'
  >;
  onSuccess?: () => void;
};

export const ListingForm: FC<Props> = ({
  onClose,
  initialListing,
  onSuccess,
}) => {
  const selectedLocale = useLocale();
  const locations = LOCALIZED_CITIES[selectedLocale];
  const defaultValues = useMemo(
    () => ({
      ...DEFAULT_RESIDENTIAL_PREMISE_DATA,
      location: locations[0]?.value ?? '',
    }),
    [locations]
  );
  const { showToast } = useToast();
  const [listingLocale, setListingLocale] = useState(selectedLocale);
  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    setValue,
    watch,
    trigger,
  } = useForm<
    Omit<
      ResidentialPremises,
      'id' | 'state' | 'userId' | 'createdAt' | 'updatedAt'
    >
  >({
    defaultValues: initialListing
      ? normalizeListingData(initialListing)
      : defaultValues,
    resolver: zodResolver(validationSchema.residentialPremises),
    mode: 'onChange',
    shouldUnregister: false,
  });
  const { t } = useTranslation();
  const [step, setStep] = useState(INIT_FORM_STEP);
  const steps = useMemo(
    () => [
      t('states.steps.basic'),
      t('states.steps.images'),
      t('states.steps.location'),
    ],
    [t]
  );
  const [showUserContactModal, setShowUserModalContact] = useState(false);
  const { data: userData } = useCurrentUser();
  const queryClient = useQueryClient();
  const propertyType = watch('propertyType');
  const isHouse = HOUSES.includes(propertyType);
  const listingType = watch('listingType');
  const location = watch('location');
  const address = watch('address');
  const fullAddress = address ? `${location}, ${address}` : location;
  const isLongTermRent = listingType === ListingType.LONG_TERM_RENT;

  const {
    data: coords,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [queryKeys.geo.geocode, fullAddress],
    queryFn: () => geocodeAddress(fullAddress),
    enabled: false,
    staleTime: 1000 * 60 * 15,
    onError: () => {
      showToast(t('errors.geocoding'), 'error');
    },
  } as UseQueryOptions<[number, number], Error>);

  useEffect(() => {
    if (propertyType === ResidentialPremisesType.STUDIO) {
      setValue('rooms', 1);
      setValue('bathrooms', 1);
      setValue('bedrooms', 1);
    }
    if (isHouse) {
      setValue('floor', undefined);
      setValue('totalFloors', undefined);
    }
  }, [propertyType, isHouse, setValue]);

  useEffect(() => {
    if (userData?.needsPhone) {
      setShowUserModalContact(true);
    }
  }, [userData?.needsPhone]);

  useEffect(() => {
    if (coords) {
      setValue('latitude', coords[0]);
      setValue('longitude', coords[1]);
    }
  }, [coords]);

  const onSubmit = async (
    data: Omit<
      ResidentialPremises,
      'id' | 'state' | 'userId' | 'createdAt' | 'updatedAt'
    >
  ) => {
    if (userData?.needsPhone) {
      setShowUserModalContact(true);

      return;
    }
    try {
      if (initialListing) {
        await updateListingFetcher({ ...data, id: initialListing.id });
      } else {
        await addListingFetcher(data);
      }
      queryClient.invalidateQueries({
        queryKey: [queryKeys.listings.userListings],
      });
      showToast(
        t(initialListing ? 'states.updated' : 'states.added'),
        'success'
      );
      if (onSuccess) {
        onSuccess();

        return;
      }
      onClose();
    } catch (_error) {
      showToast(t('errors.genericRequest'), 'error');
    }
  };

  const onUpdateListingLocale = (
    locale: string | boolean | Array<string | boolean>
  ) => setListingLocale(locale as string);

  const onFindLocationOnMap = () => {
    if (location) {
      refetch();
    }
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
  const localesDropdownOptions = AVAILABLE_LOCALES.map((locale) => ({
    name: locale,
    value: locale,
  }));

  return (
    <>
      <div
        className={classNames(
          'flex flex-col w-full mb-5',
          'lg:max-w-[1200px] lg:mx-auto'
        )}
      >
        <HeaderNavigation
          {...{ steps, step, isDisabled: isSubmitting, onGoBack: onClose }}
        />

        {step === 1 && (
          <div
            className={classNames(
              'grid grid-cols-1 gap-2 items-start',
              'lg:grid-cols-2 lg:gap-5'
            )}
          >
            <div className={classNames('space-y-2')}>
              <div className="flex items-center gap-3">
                <ControlledDropdown
                  name={'propertyType'}
                  control={control}
                  values={realEstateTypeDropdownOptions}
                  disabled={isSubmitting}
                />
                <ControlledDropdown
                  name={'listingType'}
                  control={control}
                  values={listingTypeDropdownOptions}
                  disabled={isSubmitting}
                />
                <Dropdown
                  values={localesDropdownOptions}
                  selectedValue={listingLocale}
                  onUpdate={onUpdateListingLocale}
                  icon={
                    <LanguageIcon
                      className={twMerge(
                        classNames('w-4 h-4 fill-primary', {
                          'fill-primary-content/30': isSubmitting,
                        })
                      )}
                    />
                  }
                  disabled={isSubmitting}
                />
              </div>
              <MultilingualTextInput
                name={'title'}
                control={control}
                label={`${t('listings.properties.title')} *`}
                placeholder="Title"
                {...{ selectedLocale: listingLocale, disabled: isSubmitting }}
              />
              <MultilingualTextarea
                name={'description'}
                control={control}
                label={`${t('listings.properties.description')} *`}
                placeholder="Description"
                {...{ selectedLocale: listingLocale, disabled: isSubmitting }}
              />
              <div
                className={classNames(
                  'grid grid-cols-2 gap-2',
                  'md:grid-cols-3'
                )}
              >
                <MoneyInput
                  name={'price'}
                  control={control}
                  label={`${t('listings.properties.price')} *`}
                  disabled={isSubmitting}
                  icon={
                    <WalletIcon className="w-5 h-5 stroke-primary-content" />
                  }
                  inputContainerStyles="w-40"
                />
                <NumericInput
                  name={'area'}
                  control={control}
                  label={`${t('listings.properties.area')} *`}
                  disabled={isSubmitting}
                  measurementUnitBadge={
                    <>
                      {t('measures.m')}
                      <sup>2</sup>
                    </>
                  }
                  icon={<AreaIcon className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-40"
                />
                <NumericInput
                  name={'rooms'}
                  control={control}
                  label={`${t('listings.properties.rooms')} *`}
                  disabled={
                    propertyType === ResidentialPremisesType.STUDIO ||
                    isSubmitting
                  }
                  containerStyles="col-start-1"
                  icon={<DoorIcon className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-15"
                />
                <NumericInput
                  name={'bedrooms'}
                  control={control}
                  label={`${t('listings.properties.bedrooms')} *`}
                  disabled={
                    propertyType === ResidentialPremisesType.STUDIO ||
                    isSubmitting
                  }
                  icon={<BedIcon className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-15"
                />
                <NumericInput
                  name={'bathrooms'}
                  control={control}
                  label={`${t('listings.properties.bathrooms')} *`}
                  disabled={
                    propertyType === ResidentialPremisesType.STUDIO ||
                    isSubmitting
                  }
                  icon={<BathIcon className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-15"
                />
              </div>
            </div>
            <div
              className={classNames(
                'grid grid-cols-2 gap-2',
                'md:grid-cols-3',
                'lg:pt-11'
              )}
            >
              <div className="col-start-1">
                <label className="flex items-center gap-1.5 mb-1">
                  <StairsIcon className="w-5 h-5 stroke-primary-content" />
                  <span>{t('listings.properties.floor')}</span>
                </label>
                <div className={classNames('flex items-center gap-2')}>
                  <NumericInput
                    name={'floor'}
                    control={control}
                    disabled={isHouse || isSubmitting}
                    inputContainerStyles="w-15"
                  />
                  <span>/</span>
                  <NumericInput
                    name={'totalFloors'}
                    control={control}
                    disabled={isHouse || isSubmitting}
                    inputContainerStyles="w-15"
                  />
                </div>
              </div>
              <NumericInput
                name={'buildingYear'}
                control={control}
                label={t('listings.properties.buildingYear')}
                disabled={isSubmitting}
                icon={
                  <CalendarIcon className="w-5 h-5 stroke-primary-content" />
                }
                inputContainerStyles="w-15"
              />
              {isLongTermRent ? (
                <MoneyInput
                  name={'deposit'}
                  control={control}
                  label={`${t('listings.properties.deposit')}`}
                  disabled={isSubmitting}
                  icon={
                    <PriceIcon className="w-5 h-5 stroke-primary-content" />
                  }
                  inputContainerStyles="w-40"
                />
              ) : null}
              <ControlledSwitcher
                name={'furnished'}
                control={control}
                label={t('listings.properties.furnished')}
                disabled={isSubmitting}
                icon={<ArmchairIcon className="w-5 h-5 fill-primary-content" />}
                containerStyles="col-start-1"
              />
              <ControlledSwitcher
                name={'airConditioner'}
                control={control}
                label={t('listings.properties.ac')}
                disabled={isSubmitting}
                icon={
                  <AirConditionerIcon className="w-5 h-5 fill-primary-content" />
                }
              />
              <ControlledSwitcher
                name={'parking'}
                control={control}
                label={t('listings.properties.parking')}
                disabled={isSubmitting}
                icon={<ParkingIcon className="w-5 h-5 fill-primary-content" />}
              />
              {isLongTermRent ? (
                <ControlledSwitcher
                  name={'petsAllowed'}
                  control={control}
                  label={t('listings.properties.petsAllowed')}
                  disabled={isSubmitting}
                  icon={<PetsIcon className="w-5 h-5 fill-primary-content" />}
                />
              ) : null}
            </div>
          </div>
        )}

        {step === 2 && (
          <ImageUploader
            control={control}
            name={'images'}
            disabled={isSubmitting}
          />
        )}

        {step === 3 && (
          <div className={classNames('space-y-5')}>
            <div className={classNames('flex gap-2 items-end flex-wrap')}>
              <div className={classNames('flex gap-2 flex-wrap')}>
                <ControlledDropdown
                  name={'location'}
                  control={control}
                  label={t('listings.properties.location')}
                  values={locations}
                  disabled={isSubmitting}
                  icon={
                    <LocationIcon className="w-5 h-5 stroke-primary-content" />
                  }
                  controlButtonStyles="w-40"
                  searchEnabled
                />
                <TextInput
                  name={'address'}
                  control={control}
                  label={t('listings.properties.address')}
                  disabled={isSubmitting}
                  icon={
                    <AddressIcon className="w-5 h-5 fill-primary-content" />
                  }
                />
              </div>

              <Button
                onClick={onFindLocationOnMap}
                icon={ButtonIcon.FIND_ON_MAP}
                disabled={isLoading}
                className="mt-2"
              >
                {t('actions.findOnMap')}
              </Button>
            </div>
            <ControlledMapInput
              control={control}
              nameLat={'latitude'}
              nameLon={'longitude'}
              className={classNames(
                'relative z-10 aspect-square w-full border-solid border-divider/25 border-1 rounded-lg',
                'md:aspect-auto md:h-96'
              )}
            />
          </div>
        )}

        <div className={classNames('mt-auto pt-5', 'lg:mt-10')}>
          <FormNavigation
            currentStep={step}
            totalSteps={TOTAL_FORM_STEPS}
            stepFields={STEP_FIELDS}
            isSubmitting={isSubmitting}
            isUpdate={!!initialListing}
            onStepChange={setStep}
            onTrigger={trigger}
            onSubmit={handleSubmit(onSubmit)}
            t={t}
          />
        </div>
      </div>
      {showUserContactModal && (
        <UserContactsModal handleClose={() => setShowUserModalContact(false)} />
      )}
    </>
  );
};
