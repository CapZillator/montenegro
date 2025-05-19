"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import { Button } from "@/components/common/button/Button";
import { ControlledDropdown } from "@/components/common/controlled-inputs/controlled-dropdown/ControlledDropdown";
import { MoneyInput } from "@/components/common/controlled-inputs/money-input/MoneyInput";
import { NumericInput } from "@/components/common/controlled-inputs/numeric-input/NumericInput";
import { Close } from "@/components/common/icons/actions/Close";
import { Filter } from "@/components/common/icons/actions/Filter";
import { Area } from "@/components/common/icons/realty/Area";
import { City } from "@/components/common/icons/realty/City";
import { Price } from "@/components/common/icons/realty/Price";
import { LOCALIZED_CITIES } from "@/constants/location";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { useLocale } from "@/hooks/use-locale/useLocale";
import { useTranslation } from "@/hooks/use-translation/useTranslation";
import { useWindowSize } from "@/hooks/use-window-size/useWindowSize";

import { DEFAULT_VALUES } from "./constants";

export function FiltersForm() {
  const router = useRouter();
  const { t } = useTranslation();
  const { control, reset, handleSubmit } = useForm({
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
      {!isDesktop && !isLargeDesktop && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames(
            "mt-2 mb-3 px-2 py-1 flex items-center gap-1.5 border-solid border-1 border-divider rounded-sm text-sm shadow-md uppercase"
          )}
        >
          <Filter className="w-4.5 h-4.5 stroke-primary-content" />
          <span>{t("actions.filters")}</span>
        </button>
      )}
      <form
        className={classNames(
          "fixed flex flex-col gap-3 bg-primary left-0 top-12 bottom-0 right-0 px-3 py-5 z-10 -translate-x-full duration-300",
          "lg:w-60 lg:translate-x-0 lg:right-auto lg:left-auto lg:px-0 lg:top-19",
          "xl:w-80",
          { "translate-x-0": isOpen }
        )}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex w-full gap-2 items-center">
          <ControlledDropdown
            name={"propertyType"}
            control={control}
            values={realEstateTypeDropdownOptions}
          />
          <ControlledDropdown
            name={"listingType"}
            control={control}
            values={listingTypeDropdownOptions}
          />
          {!isDesktop && !isLargeDesktop && (
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer ml-auto"
            >
              <Close className="w-6 h-6 fill-primary-content duration-300 hover:fill-secondary-content" />
            </button>
          )}
        </div>

        <div>
          <ControlledDropdown
            name={"location"}
            control={control}
            values={locations}
            icon={<City className="w-5 h-5 stroke-primary" />}
            searchEnabled
          />
        </div>

        <div>
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

        <div>
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
