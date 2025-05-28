import { SqlOperator } from "./sql";

export type ResidentialPremisesFilters = {
  priceFrom?: number | null;
  priceTo?: number | null;

  propertyType?: string[] | null;
  listingType?: string[] | null;

  roomsFrom?: number | null;
  roomsTo?: number | null;

  bedroomsFrom?: number | null;
  bedroomsTo?: number | null;

  bathroomsFrom?: number | null;
  bathroomsTo?: number | null;

  areaFrom?: number | null;
  areaTo?: number | null;

  location?: string[] | null;

  floorFrom?: number | null;
  floorTo?: number | null;

  buildingYearFrom?: number | null;
  buildingYearTo?: number | null;

  depositFrom?: number | null;
  depositTo?: number | null;

  balconyFrom?: number | null;
  balconyTo?: number | null;

  furnished?: boolean | null;
  parking?: boolean | null;
  airConditioner?: boolean | null;
  petsAllowed?: boolean | null;

  heating?: string[];
};

export type FilterCondition = {
  field: string;
  operator: SqlOperator;
  value: any;
};

export type FilterConfigItem<K extends keyof ResidentialPremisesFilters> = {
  key: K;
  field: string;
  operator: SqlOperator;
  test: (value: ResidentialPremisesFilters[K]) => boolean;
  parse: (raw: string | string[] | undefined) => ResidentialPremisesFilters[K];
};
