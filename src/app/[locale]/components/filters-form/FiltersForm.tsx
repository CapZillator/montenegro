"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";

type FormValues = {
  propertyType: string[];
  priceFrom: number | null;
  priceTo: number | null;
};

const defaultValues: FormValues = {
  propertyType: [],
  priceFrom: null,
  priceTo: null,
};

export function FiltersForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { control, watch, setValue } = useForm<FormValues>({
    defaultValues,
  });

  // Заполнение из searchParams (если юзер перешёл по ссылке с фильтрами)
  useEffect(() => {
    const urlPropertyType = searchParams.get("propertyType");
    const urlPriceFrom = searchParams.get("priceFrom");
    const urlPriceTo = searchParams.get("priceTo");

    if (urlPropertyType) {
      setValue("propertyType", urlPropertyType.split(","));
    }
    if (urlPriceFrom) {
      setValue("priceFrom", +urlPriceFrom);
    }
    if (urlPriceTo) {
      setValue("priceTo", +urlPriceTo);
    }
  }, [searchParams, setValue]);

  // Автоматическое обновление URL при изменении формы
  const watchedValues = watch();

  useEffect(() => {
    const query = new URLSearchParams();

    if (watchedValues.propertyType.length > 0) {
      query.set("propertyType", watchedValues.propertyType.join(","));
    }

    if (watchedValues.priceFrom != null) {
      query.set("priceFrom", String(watchedValues.priceFrom));
    }

    if (watchedValues.priceTo != null) {
      query.set("priceTo", String(watchedValues.priceTo));
    }

    router.push(`?${query.toString()}`);
  }, [watchedValues, router]);

  return (
    <form className="flex flex-col gap-4">
      <Controller
        name="propertyType"
        control={control}
        render={({ field }) => (
          <select
            multiple
            value={field.value}
            onChange={(e) =>
              field.onChange(
                Array.from(e.target.selectedOptions, (option) => option.value)
              )
            }
          >
            <option value="apartment">Apartment</option>
            <option value="villa">Villa</option>
            <option value="house">House</option>
          </select>
        )}
      />

      <Controller
        name="priceFrom"
        control={control}
        render={({ field }) => (
          <input
            type="number"
            placeholder="Price from"
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(e.target.value ? +e.target.value : null)
            }
          />
        )}
      />

      <Controller
        name="priceTo"
        control={control}
        render={({ field }) => (
          <input
            type="number"
            placeholder="Price to"
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(e.target.value ? +e.target.value : null)
            }
          />
        )}
      />
    </form>
  );
}
