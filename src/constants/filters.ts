import { FilterConfigItem, ResidentialPremisesFilters } from "@/types/filters";
import { SqlOperator } from "@/types/sql";

const numberKeys = [
  "price",
  "rooms",
  "bedrooms",
  "bathrooms",
  "area",
  "floor",
  "buildingYear",
  "deposit",
  "balcony",
] as const;

const stringKeys = [
  "propertyType",
  "listingType",
  "location",
  "heating",
] as const;

export const filterConfig: readonly FilterConfigItem<
  keyof ResidentialPremisesFilters
>[] = [
  ...stringKeys.map((key) => ({
    key: key as keyof ResidentialPremisesFilters,
    field: key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
    operator: "IN" as SqlOperator,
    test: (v: number | boolean | string[] | null | undefined) =>
      Array.isArray(v) && v.length > 0,
    parse: (raw: string | string[] | undefined) =>
      typeof raw === "string" ? raw.split(",") : Array.isArray(raw) ? raw : [],
  })),

  ...numberKeys.flatMap(
    (base): FilterConfigItem<keyof ResidentialPremisesFilters>[] => [
      {
        key: `${base}From` as keyof ResidentialPremisesFilters,
        field: base.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
        operator: ">=",
        test: (v) => typeof v === "number",
        parse: (raw) => (raw && !isNaN(+raw) ? +raw : null),
      },
      {
        key: `${base}To` as keyof ResidentialPremisesFilters,
        field: base.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
        operator: "<=",
        test: (v) => typeof v === "number",
        parse: (raw) => (raw && !isNaN(+raw) ? +raw : null),
      },
    ]
  ),

  ...["furnished", "parking", "airConditioner", "petsAllowed"].map((key) => ({
    key: key as keyof ResidentialPremisesFilters,
    field: key.replace(/[A-Z]/g, (m) => `_${m.toLowerCase()}`),
    operator: "=" as SqlOperator,
    test: (v: unknown) => typeof v === "boolean",
    parse: (raw: unknown) =>
      raw === "true" ? true : raw === "false" ? false : null,
  })),
];
