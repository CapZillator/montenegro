"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import { ControlledRangeSlider } from "@/components/common//controlled-inputs/controlled-range-slider/ControlledRangeSlider";
import { Button } from "@/components/common/button/Button";
import { ControlledDropdown } from "@/components/common/controlled-inputs/controlled-dropdown/ControlledDropdown";
import { MoneyInput } from "@/components/common/controlled-inputs/money-input/MoneyInput";
import { NumericInput } from "@/components/common/controlled-inputs/numeric-input/NumericInput";
import { Close } from "@/components/common/icons/actions/Close";
import { Filter } from "@/components/common/icons/actions/Filter";
import { Area } from "@/components/common/icons/realty/Area";
import { Bath } from "@/components/common/icons/realty/Bath";
import { Bed } from "@/components/common/icons/realty/Bed";
import { City } from "@/components/common/icons/realty/City";
import { Deal } from "@/components/common/icons/realty/Deal";
import { Door } from "@/components/common/icons/realty/Door";
import { Location } from "@/components/common/icons/realty/Location";
import { Price } from "@/components/common/icons/realty/Price";
import { LOCALIZED_CITIES } from "@/constants/location";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { useLocale } from "@/hooks/use-locale/useLocale";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { useWindowSize } from "@/hooks/use-window-size/useWindowSize";
import { ResidentialPremisesFilters } from "@/types/filters";

import { DEFAULT_VALUES } from "./constants";

export function FiltersForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { control, reset, handleSubmit } = useForm<ResidentialPremisesFilters>({
    defaultValues: DEFAULT_VALUES,
  });
  const { isDesktop, isLargeDesktop } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();

  const onSubmit = (data: any) => {
    console.log("Filters Data", data);
    const params = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      if (Array.isArray(value) && !value.length) return;
      if (value) {
        params.set(key, value.toString());
      }
    });

    if (!isDesktop && !isLargeDesktop) {
      setIsOpen(false);
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
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          "mt-2 mb-3 px-2 py-1 flex items-center gap-1.5 border-solid border-1 border-divider rounded-sm text-sm shadow-md uppercase",
          "lg:hidden"
        )}
      >
        <Filter className="w-4.5 h-4.5 stroke-primary-content" />
        <span>{t("actions.filters")}</span>
      </button>
      <form
        className={classNames(
          "fixed flex flex-col bg-primary left-0 top-12 bottom-0 right-0 px-3 py-5 z-10 -translate-x-full duration-300",
          "lg:w-60 lg:translate-x-0 lg:right-auto lg:left-auto lg:px-0 lg:top-15",
          "xl:w-80",
          { "translate-x-0": isOpen }
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className={classNames(
            "flex items-center justify-between mb-1",
            "lg:hidden"
          )}
        >
          <h4 className="text-lg font-semibold">{t("filters.label")}</h4>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className={classNames("cursor-pointer")}
          >
            <Close className="w-6 h-6 fill-primary-content duration-300 hover:fill-secondary-content" />
          </button>
        </div>

        <div
          className={classNames(
            "grid grid-cols-2 gap-x-3 gap-y-2 max-w-100 mb-3"
          )}
        >
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

        <div className="max-w-100 mb-3">
          <div className="flex gap-1.5 items-center mb-1">
            <Price className={classNames("w-5 h-5 fill-primary-content")} />
            <p>{t("listings.properties.price")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <MoneyInput name={"priceFrom"} control={control} />
            <div className="w-5 h-0.5 bg-primary-content" />
            <MoneyInput name={"priceTo"} control={control} />
          </div>
        </div>

        <div className="max-w-100 mb-3">
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

        <div className="max-w-100 space-y-1">
          <ControlledRangeSlider
            nameFrom="roomsFrom"
            nameTo="roomsTo"
            control={control}
            label={t("listings.properties.rooms")}
            max={12}
            icon={<Door className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledRangeSlider
            control={control}
            max={10}
            label={t("listings.properties.bedrooms")}
            nameFrom="bedroomsFrom"
            nameTo="bedroomsTo"
            icon={<Bed className="w-5 h-5 fill-primary-content" />}
          />
          <ControlledRangeSlider
            control={control}
            max={6}
            label={t("listings.properties.bathrooms")}
            nameFrom="bathroomsFrom"
            nameTo="bathroomsTo"
            icon={<Bath className="w-5 h-5 fill-primary-content" />}
          />
        </div>

        <div className="mt-3 flex gap-1.5 items-center">
          <Button type="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="submit">Filter</Button>
        </div>
      </form>
    </>
  );
}
