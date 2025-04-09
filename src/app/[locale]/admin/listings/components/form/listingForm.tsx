import { FC, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Dropdown } from "@/components/common/dropdown/Dropdown";
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
import { Price } from "@/components/common/icons/realty/Price";
import { Stairs } from "@/components/common/icons/realty/Stairs";
import { AVAILABLE_LOCALES } from "@/constants/i18n";
import { LOCALIZED_CITIES } from "@/constants/location";
import { validationSchema } from "@/constants/validationSchemas";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { addListingFetcher } from "@/fetchers/listings";
import { useLocale } from "@/hooks/use-locale/useLocale";
import { useToast } from "@/hooks/use-toast/useToast";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { ResidentialPremises } from "@/types/realEstate";

import { StepIndicator } from "./components/step-indicator/StepIndicator";
import {
  DEFAULT_RESIDENTIAL_PREMISE_DATA,
  HOUSES,
  INIT_FORM_STEP,
  STEP_FIELDS,
  TOTAL_FORM_STEPS,
} from "./constants";

type Props = {
  onClose: () => void;
};

export const ListingForm: FC<Props> = ({ onClose }) => {
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
    defaultValues,
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

  const propertyType = watch("propertyType");
  const isHouse = HOUSES.includes(propertyType);


  useEffect(() => {
    if (propertyType === ResidentialPremisesType.STUDIO) {
      setValue("rooms", 1);
      setValue("bathrooms", 1);
      setValue("bedrooms", 1);
    }
    if (propertyType === ResidentialPremisesType.ROOM) {
      setValue("rooms", 1);
    }
    if (isHouse) {
      setValue("floor", undefined);
      setValue("totalFloors", undefined);
    }
  }, [propertyType, isHouse, setValue]);

  const onSubmit = async (
    data: Omit<ResidentialPremises, "id" | "userId" | "createdAt" | "updatedAt">
  ) => {
    console.log("sub data", data);
    // showToast(`added`, "success");
    try {
      await addListingFetcher(data);
      showToast(`added`, "success");
    } catch (_error) {
      showToast(`error`, "error");
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

  const onUpdateListingLocale = (locale: string | boolean) =>
    setListingLocale(locale as string);

  return (
    <div className={classNames("space-y-3 w-full", "xl:max-w-200")}>
      <h5 className={classNames("text-lg font-semibold text-center")}>
        New listing
      </h5>
      <StepIndicator {...{ steps, currentStep: step }} />
      {step === 1 && (
        <>
          <div className="flex items-center gap-2">
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
          <div className={classNames("grid grid-cols-4 gap-2")}>
            <MoneyInput
              name={"price"}
              control={control}
              label={`${t("listings.properties.price")} *`}
              disabled={isSubmitting}
              containerStyles="w-35"
              icon={<Price className="w-5 h-5 fill-primary-content" />}
            />
            <NumericInput
              name={"area"}
              control={control}
              label={`${t("listings.properties.area")} *`}
              disabled={isSubmitting}
              measurementUnitBadge={
                <>
                  m<sup>2</sup>
                </>
              }
              containerStyles="w-30"
              icon={<Area className="w-5 h-5 fill-primary-content" />}
            />
            <NumericInput
              name={"rooms"}
              control={control}
              label={`${t("listings.properties.rooms")} *`}
              disabled={
                propertyType === ResidentialPremisesType.STUDIO ||
                propertyType === ResidentialPremisesType.ROOM ||
                isSubmitting
              }
              containerStyles="w-10"
              icon={<Door className="w-5 h-5 fill-primary-content" />}
            />
            <NumericInput
              name={"bedrooms"}
              control={control}
              label={`${t("listings.properties.bedrooms")} *`}
              disabled={
                propertyType === ResidentialPremisesType.STUDIO || isSubmitting
              }
              containerStyles="w-10"
              icon={<Bed className="w-5 h-5 fill-primary-content" />}
            />
            <NumericInput
              name={"bathrooms"}
              control={control}
              label={`${t("listings.properties.bathrooms")} *`}
              disabled={
                propertyType === ResidentialPremisesType.STUDIO || isSubmitting
              }
              containerStyles="w-10"
              icon={<Bath className="w-5 h-5 fill-primary-content" />}
            />

            <div>
              <label className="flex items-center gap-1.5 mb-1">
                <Stairs className="w-5 h-5 stroke-primary-content" />
                <span>{t("listings.properties.floor")}</span>
              </label>
              <div className={classNames("flex items-center gap-2")}>
                <NumericInput
                  name={"floor"}
                  control={control}
                  disabled={isHouse || isSubmitting}
                  containerStyles="w-10"
                />
                <span>/</span>
                <NumericInput
                  name={"totalFloors"}
                  control={control}
                  disabled={isHouse || isSubmitting}
                  containerStyles="w-10"
                />
              </div>
            </div>
            <NumericInput
              name={"buildingYear"}
              control={control}
              label={t("listings.properties.buildingYear")}
              disabled={isSubmitting}
              containerStyles="w-15"
              icon={<Calendar className="w-5 h-5 stroke-primary-content" />}
            />
          </div>
          <div className={classNames("grid grid-cols-4 gap-2")}>
            <ControlledSwitcher
              name={"furnished"}
              control={control}
              label={t("listings.properties.furnished")}
              disabled={isSubmitting}
              icon={<Armchair className="w-5 h-5 fill-primary-content" />}
            />
            <ControlledSwitcher
              name={"airConditioner"}
              control={control}
              label={t("listings.properties.ac")}
              disabled={isSubmitting}
              icon={<AirConditioner className="w-5 h-5 fill-primary-content" />}
            />
            <ControlledSwitcher
              name={"parking"}
              control={control}
              label={t("listings.properties.parking")}
              disabled={isSubmitting}
              icon={<Parking className="w-5 h-5 fill-primary-content" />}
            />
          </div>
        </>
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
            icon={<City className="w-5 h-5 stroke-primary" />}
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

      <FormNavigation
        currentStep={step}
        totalSteps={TOTAL_FORM_STEPS}
        stepFields={STEP_FIELDS}
        isSubmitting={isSubmitting}
        onStepChange={setStep}
        onTrigger={trigger}
        onSubmit={handleSubmit(onSubmit)}
        t={t}
      />
    </div>
  );
};
