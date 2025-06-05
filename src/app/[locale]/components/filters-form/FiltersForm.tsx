"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import { ControlledRangeSlider } from "@/components/common//controlled-inputs/controlled-range-slider/ControlledRangeSlider";
import { Accordion } from "@/components/common/accordion/Accordion";
import { Button } from "@/components/common/button/Button";
import { ButtonIcon } from "@/components/common/button/enums";
import { ControlledDropdown } from "@/components/common/controlled-inputs/controlled-dropdown/ControlledDropdown";
import { ControlledSwitcher } from "@/components/common/controlled-inputs/controlled-switcher/ControlledSwitcher";
import { MoneyInput } from "@/components/common/controlled-inputs/money-input/MoneyInput";
import { NumericInput } from "@/components/common/controlled-inputs/numeric-input/NumericInput";
import { Close } from "@/components/common/icons/actions/Close";
import { Filter } from "@/components/common/icons/actions/Filter";
import { AirConditioner } from "@/components/common/icons/realty/AirConditioner";
import { Area } from "@/components/common/icons/realty/Area";
import { Armchair } from "@/components/common/icons/realty/Armchair";
import { Bath } from "@/components/common/icons/realty/Bath";
import { Bed } from "@/components/common/icons/realty/Bed";
import { Calendar } from "@/components/common/icons/realty/Calendar";
import { City } from "@/components/common/icons/realty/City";
import { Deal } from "@/components/common/icons/realty/Deal";
import { Door } from "@/components/common/icons/realty/Door";
import { Location } from "@/components/common/icons/realty/Location";
import { Parking } from "@/components/common/icons/realty/Parking";
import { Pets } from "@/components/common/icons/realty/Pets";
import { Stairs } from "@/components/common/icons/realty/Stairs";
import { Wallet } from "@/components/common/icons/realty/Wallet";
import { LOCALIZED_CITIES } from "@/constants/location";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { useLocale } from "@/hooks/use-locale/useLocale";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { useWindowSize } from "@/hooks/use-window-size/useWindowSize";
import { ResidentialPremisesFilters } from "@/types/filters";

import { DEFAULT_FILTERS_BAR_STATE, DEFAULT_VALUES } from "./constants";

export function FiltersForm() {
  const [filtersBarState, setFiltersBarState] = useState(
    DEFAULT_FILTERS_BAR_STATE
  );
  const router = useRouter();
  const { t } = useTranslation();
  const { control, reset, watch, handleSubmit } =
    useForm<ResidentialPremisesFilters>({
      defaultValues: DEFAULT_VALUES,
    });
  const { isDesktop, isLargeDesktop } = useWindowSize();
  const currentLocale = useLocale();
  const listingType = watch("listingType");
  const isLongTermRent =
    listingType && listingType === ListingType.LONG_TERM_RENT;

  const onSubmit = (data: any) => {
    const params = new URLSearchParams();

    Object.entries(
      isLongTermRent ? data : { ...data, petsAllowed: null }
    ).forEach(([key, value]) => {
      if (Array.isArray(value) && !value.length) return;
      if (value) {
        params.set(key, value.toString());
      }
    });

    if (!isDesktop && !isLargeDesktop) {
      setFiltersBarState({ ...filtersBarState, isMainOpen: false });
    }
    router.push(`?${params.toString()}`);
  };

  const onReset = () => reset();

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
          "mt-2 mb-3 px-2 py-1 flex items-center gap-1.5 border-solid border-1 border-divider rounded-sm text-sm shadow-md uppercase bg-primary",
          "xl:hidden"
        )}
      >
        <Filter className="w-4.5 h-4.5 stroke-primary-content" />
        <span>{t("actions.filters")}</span>
      </button>
      <form
        className={classNames(
          "fixed flex flex-col bg-neutral left-0 top-12 bottom-0 right-0 px-4 pt-5 pb-5 z-10 -translate-x-full duration-300 overflow-y-auto max-w-100 scrollbar",
          "xl:w-80 xl:-translate-x-2 xl:right-auto xl:left-auto xl:pl-2 xl:pr-5 xl:pt-8",
          { "translate-x-0": filtersBarState.isMainOpen }
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={classNames(
            "flex items-center justify-between mb-1",
            "xl:hidden"
          )}
        >
          <h4 className="text-lg font-semibold">{t("filters.label")}</h4>
          <button
            type="button"
            onClick={() =>
              setFiltersBarState({ ...filtersBarState, isMainOpen: false })
            }
            className={classNames("cursor-pointer")}
          >
            <Close className="w-6 h-6 fill-primary-content duration-300 hover:fill-secondary-content" />
          </button>
        </div>

        <div className={classNames("grid grid-cols-2 gap-x-3 gap-y-2  mb-3")}>
          <ControlledDropdown
            name={"propertyType"}
            control={control}
            values={realEstateTypeDropdownOptions}
            controlButtonStyles="w-full"
            label={t("filters.type")}
            icon={<City className="w-5 h-5 stroke-primary-content" />}
          />
          <ControlledDropdown
            name={"listingType"}
            control={control}
            values={listingTypeDropdownOptions}
            controlButtonStyles="w-full"
            label={t("filters.listingType")}
            icon={<Deal className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledDropdown
            name={"location"}
            control={control}
            values={locations}
            controlButtonStyles="w-full"
            label={t("filters.place")}
            searchEnabled
            icon={<Location className="w-5 h-5 stroke-primary-content" />}
          />
        </div>

        <div className="mb-3">
          <div className="flex gap-1.5 items-center mb-1">
            <Wallet className={classNames("w-5 h-5 stroke-primary-content")} />
            <p>{t("listings.properties.price")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <MoneyInput name={"priceFrom"} control={control} />
            <div className="w-5 h-0.5 bg-primary-content" />
            <MoneyInput name={"priceTo"} control={control} />
          </div>
        </div>

        <div className="mb-3">
          <div className="flex gap-1.5 items-center mb-1">
            <Area className={classNames("w-5 h-5 fill-primary-content")} />
            <p>{t("listings.properties.area")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <NumericInput
              name={"areaFrom"}
              control={control}
              measurementUnitBadge={
                <>
                  {t("measures.m")}
                  <sup>2</sup>
                </>
              }
            />
            <div className="w-5 h-0.5 bg-primary-content" />
            <NumericInput
              name={"areaTo"}
              control={control}
              measurementUnitBadge={
                <>
                  {t("measures.m")}
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
            label={t("listings.properties.rooms")}
            max={9}
            icon={<Door className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledRangeSlider
            control={control}
            max={7}
            label={t("listings.properties.bedrooms")}
            nameFrom="bedroomsFrom"
            nameTo="bedroomsTo"
            icon={<Bed className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledRangeSlider
            control={control}
            max={5}
            label={t("listings.properties.bathrooms")}
            nameFrom="bathroomsFrom"
            nameTo="bathroomsTo"
            icon={<Bath className="w-5 h-5 fill-primary-content" />}
          />
        </div>

        <div className="w-full">
          <Accordion
            title={
              filtersBarState.isAdditionalOpen
                ? t("actions.showLessParams")
                : t("actions.showMoreParams")
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
                <Stairs
                  className={classNames("w-5 h-5 fill-primary-content")}
                />
                <p>{t("listings.properties.floor")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <NumericInput name={"floorFrom"} control={control} />
                <div className="w-5 h-0.5 bg-primary-content" />
                <NumericInput name={"floorTo"} control={control} />
              </div>
            </div>

            <div className="mb-3">
              <div className="flex gap-1.5 items-center mb-1">
                <Calendar
                  className={classNames("w-5 h-5 stroke-primary-content")}
                />
                <p>{t("listings.properties.buildingYear")}</p>
              </div>
              <div className="flex gap-2 items-center">
                <NumericInput name={"buildingYearFrom"} control={control} />
                <div className="w-5 h-0.5 bg-primary-content" />
                <NumericInput name={"buildingYearTo"} control={control} />
              </div>
            </div>

            <div className={classNames("grid grid-cols-2 gap-x-8 gap-y-2")}>
              <ControlledSwitcher
                control={control}
                name="furnished"
                label={t("listings.properties.furnished")}
                icon={<Armchair className="w-5 h-5 fill-primary-content" />}
              />
              <ControlledSwitcher
                control={control}
                name="parking"
                label={t("listings.properties.parking")}
                icon={<Parking className="w-5 h-5 fill-primary-content" />}
              />
              <ControlledSwitcher
                control={control}
                name="airConditioner"
                label={t("listings.properties.ac")}
                icon={
                  <AirConditioner className="w-5 h-5 fill-primary-content" />
                }
              />
              {isLongTermRent ? (
                <ControlledSwitcher
                  name={"petsAllowed"}
                  control={control}
                  label={t("listings.properties.petsAllowed")}
                  icon={<Pets className="w-5 h-5 fill-primary-content" />}
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
            iconClassName="w-4.5 h-4.5 fill-primary"
          >
            {t("actions.reset")}
          </Button>
          <Button
            type="submit"
            icon={ButtonIcon.FILTER}
            iconClassName="w-4.5 h-4.5 stroke-primary"
          >
            {t("actions.apply")}
          </Button>
        </div>
      </form>
    </>
  );
}
