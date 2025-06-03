import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { ControlledDropdown } from "@/components/common/controlled-inputs/controlled-dropdown/ControlledDropdown";
import { ControlledSwitcher } from "@/components/common/controlled-inputs/controlled-switcher/ControlledSwitcher";
import { ImageUploader } from "@/components/common/controlled-inputs/image-uploader/ImageUploader";
import { MoneyInput } from "@/components/common/controlled-inputs/money-input/MoneyInput";
import { MultilingualTextInput } from "@/components/common/controlled-inputs/multilingual-text-input/MultilingualTextInput";
import { MultilingualTextarea } from "@/components/common/controlled-inputs/multilingual-textarea/MultilingualTextarea";
import { NumericInput } from "@/components/common/controlled-inputs/numeric-input/NumericInput";
import { TextInput } from "@/components/common/controlled-inputs/text-input/TextInput";
import { FormNavigation } from "@/components/common/form-navigation/FormNavigation";
import { Language } from "@/components/common/icons/Language";
import { Address } from "@/components/common/icons/realty/Address";
import { AirConditioner } from "@/components/common/icons/realty/AirConditioner";
import { Area } from "@/components/common/icons/realty/Area";
import { Armchair } from "@/components/common/icons/realty/Armchair";
import { Bath } from "@/components/common/icons/realty/Bath";
import { Bed } from "@/components/common/icons/realty/Bed";
import { Calendar } from "@/components/common/icons/realty/Calendar";
import { City } from "@/components/common/icons/realty/City";
import { Door } from "@/components/common/icons/realty/Door";
import { Parking } from "@/components/common/icons/realty/Parking";
import { Stairs } from "@/components/common/icons/realty/Stairs";
import { Wallet } from "@/components/common/icons/realty/Wallet";
import { Dropdown } from "@/components/common/inputs/dropdown/Dropdown";
import { UserContactsModal } from "@/components/common/user-contacts-modal/UserContactsModal";
import { queryKeys } from "@/constants/fetch";
import { AVAILABLE_LOCALES } from "@/constants/i18n";
import { LOCALIZED_CITIES } from "@/constants/location";
import { validationSchema } from "@/constants/validationSchemas";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { addListingFetcher, updateListingFetcher } from "@/fetchers/listings";
import { useCurrentUser } from "@/hooks/use-current-user/useCurrentUser";
import { useLocale } from "@/hooks/use-locale/useLocale";
import { useToast } from "@/hooks/use-toast/useToast";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { ResidentialPremises } from "@/types/realEstate";

import { HeaderNavigation } from "./components/header-navigation/HeaderNavigation";
import {
  DEFAULT_RESIDENTIAL_PREMISE_DATA,
  HOUSES,
  INIT_FORM_STEP,
  STEP_FIELDS,
  TOTAL_FORM_STEPS,
} from "./constants";
import { normalizeListingData } from "./utils";

type Props = {
  onClose: () => void;
  initialListing?: Omit<
    ResidentialPremises,
    "userId" | "createdAt" | "updatedAt"
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
      location: locations[0]?.value ?? "",
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
    Omit<ResidentialPremises, "id" | "userId" | "createdAt" | "updatedAt">
  >({
    defaultValues: initialListing
      ? normalizeListingData(initialListing)
      : defaultValues,
    resolver: zodResolver(validationSchema.residentialPremises),
    mode: "onChange",
    shouldUnregister: false,
  });
  const { t } = useTranslation();
  const [step, setStep] = useState(INIT_FORM_STEP);
  const steps = useMemo(
    () => [
      t("states.steps.basic"),
      t("states.steps.images"),
      t("states.steps.location"),
    ],
    [t]
  );
  const [showUserContactModal, setShowUserModalContact] = useState(false);
  const { data: userData } = useCurrentUser();
  const queryClient = useQueryClient();
  const propertyType = watch("propertyType");
  const isHouse = HOUSES.includes(propertyType);

  useEffect(() => {
    if (propertyType === ResidentialPremisesType.STUDIO) {
      setValue("rooms", 1);
      setValue("bathrooms", 1);
      setValue("bedrooms", 1);
    }
    if (isHouse) {
      setValue("floor", undefined);
      setValue("totalFloors", undefined);
    }
  }, [propertyType, isHouse, setValue]);

  useEffect(() => {
    if (userData?.needsPhone) {
      setShowUserModalContact(true);
    }
  }, [userData?.needsPhone]);

  const onSubmit = async (
    data: Omit<ResidentialPremises, "id" | "userId" | "createdAt" | "updatedAt">
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
        t(initialListing ? "states.updated" : "states.added"),
        "success"
      );
      if (onSuccess) {
        onSuccess();

        return;
      }
      onClose();
    } catch (_error) {
      showToast(t("errors.genericRequest"), "error");
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

  const onUpdateListingLocale = (
    locale: string | boolean | Array<string | boolean>
  ) => setListingLocale(locale as string);

  return (
    <>
      <div
        className={classNames(
          "flex flex-col w-full mb-5",
          "lg:max-w-[1200px] lg:mx-auto"
        )}
      >
        <HeaderNavigation
          {...{ steps, step, isDisabled: isSubmitting, onGoBack: onClose }}
        />

        {step === 1 && (
          <div
            className={classNames(
              "grid grid-cols-1 gap-2 items-start",
              "lg:grid-cols-2 lg:gap-5"
            )}
          >
            <div className={classNames("space-y-2")}>
              <div className="flex items-center gap-3">
                <ControlledDropdown
                  name={"propertyType"}
                  control={control}
                  values={realEstateTypeDropdownOptions}
                  disabled={isSubmitting}
                />
                <ControlledDropdown
                  name={"listingType"}
                  control={control}
                  values={listingTypeDropdownOptions}
                  disabled={isSubmitting}
                />
                <Dropdown
                  values={localesDropdownOptions}
                  selectedValue={listingLocale}
                  onUpdate={onUpdateListingLocale}
                  icon={
                    <Language
                      className={twMerge(
                        classNames("w-4 h-4 fill-primary", {
                          "fill-primary-content/30": isSubmitting,
                        })
                      )}
                    />
                  }
                  disabled={isSubmitting}
                />
              </div>
              <MultilingualTextInput
                name={"title"}
                control={control}
                label={`${t("listings.properties.title")} *`}
                placeholder="Title"
                {...{ selectedLocale: listingLocale, disabled: isSubmitting }}
              />
              <MultilingualTextarea
                name={"description"}
                control={control}
                label={`${t("listings.properties.description")} *`}
                placeholder="Description"
                {...{ selectedLocale: listingLocale, disabled: isSubmitting }}
              />
              <div
                className={classNames(
                  "grid grid-cols-2 gap-2",
                  "md:grid-cols-3"
                )}
              >
                <MoneyInput
                  name={"price"}
                  control={control}
                  label={`${t("listings.properties.price")} *`}
                  disabled={isSubmitting}
                  icon={<Wallet className="w-5 h-5 stroke-primary-content" />}
                  inputContainerStyles="w-40"
                />
                <NumericInput
                  name={"area"}
                  control={control}
                  label={`${t("listings.properties.area")} *`}
                  disabled={isSubmitting}
                  measurementUnitBadge={
                    <>
                      {t("measures.m")}
                      <sup>2</sup>
                    </>
                  }
                  icon={<Area className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-40"
                />
                <NumericInput
                  name={"rooms"}
                  control={control}
                  label={`${t("listings.properties.rooms")} *`}
                  disabled={
                    propertyType === ResidentialPremisesType.STUDIO ||
                    isSubmitting
                  }
                  containerStyles="col-start-1"
                  icon={<Door className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-15"
                />
                <NumericInput
                  name={"bedrooms"}
                  control={control}
                  label={`${t("listings.properties.bedrooms")} *`}
                  disabled={
                    propertyType === ResidentialPremisesType.STUDIO ||
                    isSubmitting
                  }
                  icon={<Bed className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-15"
                />
                <NumericInput
                  name={"bathrooms"}
                  control={control}
                  label={`${t("listings.properties.bathrooms")} *`}
                  disabled={
                    propertyType === ResidentialPremisesType.STUDIO ||
                    isSubmitting
                  }
                  icon={<Bath className="w-5 h-5 fill-primary-content" />}
                  inputContainerStyles="w-15"
                />
              </div>
            </div>
            <div
              className={classNames(
                "grid grid-cols-2 gap-2",
                "md:grid-cols-3",
                "lg:pt-11"
              )}
            >
              <div className="col-start-1">
                <label className="flex items-center gap-1.5 mb-1">
                  <Stairs className="w-5 h-5 stroke-primary-content" />
                  <span>{t("listings.properties.floor")}</span>
                </label>
                <div className={classNames("flex items-center gap-2")}>
                  <NumericInput
                    name={"floor"}
                    control={control}
                    disabled={isHouse || isSubmitting}
                    inputContainerStyles="w-15"
                  />
                  <span>/</span>
                  <NumericInput
                    name={"totalFloors"}
                    control={control}
                    disabled={isHouse || isSubmitting}
                    inputContainerStyles="w-15"
                  />
                </div>
              </div>
              <NumericInput
                name={"buildingYear"}
                control={control}
                label={t("listings.properties.buildingYear")}
                disabled={isSubmitting}
                icon={<Calendar className="w-5 h-5 stroke-primary-content" />}
                inputContainerStyles="w-15"
              />
              <ControlledSwitcher
                name={"furnished"}
                control={control}
                label={t("listings.properties.furnished")}
                disabled={isSubmitting}
                icon={<Armchair className="w-5 h-5 fill-primary-content" />}
                containerStyles="col-start-1"
              />
              <ControlledSwitcher
                name={"airConditioner"}
                control={control}
                label={t("listings.properties.ac")}
                disabled={isSubmitting}
                icon={
                  <AirConditioner className="w-5 h-5 fill-primary-content" />
                }
              />
              <ControlledSwitcher
                name={"parking"}
                control={control}
                label={t("listings.properties.parking")}
                disabled={isSubmitting}
                icon={<Parking className="w-5 h-5 fill-primary-content" />}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <ImageUploader
            control={control}
            name={"images"}
            disabled={isSubmitting}
          />
        )}

        {step === 3 && (
          <div className={classNames("flex items-end gap-2")}>
            <ControlledDropdown
              name={"location"}
              control={control}
              values={locations}
              disabled={isSubmitting}
              icon={<City className="w-5 h-5 stroke-primary-content" />}
              controlButtonStyles="w-40"
              searchEnabled
            />
            <TextInput
              name={"address"}
              control={control}
              label={t("listings.properties.address")}
              disabled={isSubmitting}
              icon={<Address className="w-5 h-5 fill-primary-content" />}
            />
          </div>
        )}

        <div className={classNames("mt-auto pt-5", "lg:mt-10")}>
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
