import { Currency } from "@/enums/currencies";
import { ListingType, ResidentialPremisesType } from "@/enums/listing";
import { ResidentialPremises } from "@/types/realEstate";

export const DEFAULT_RESIDENTIAL_PREMISE_DATA = {
  title: {},
  description: {},
  price: 0,
  currency: Currency.EUR,
  propertyType: ResidentialPremisesType.APARTMENT,
  listingType: ListingType.SALE,
  rooms: 1,
  bedrooms: 1,
  bathrooms: 1,
  area: undefined,
  location: "",
  images: [],
  floor: undefined,
  totalFloors: undefined,
  buildingYear: undefined,
  furnished: undefined,
  airConditioner: undefined,
  balcony: undefined,
  parking: undefined,
  heating: "",
  address: "",
  latitude: undefined,
  longitude: undefined,
  deposit: undefined,
  petsAllowed: undefined,
};

export const HOUSES = [
  ResidentialPremisesType.HOUSE,
  ResidentialPremisesType.DUPLEX_TRIPLEX,
  ResidentialPremisesType.TOWNHOUSE,
  ResidentialPremisesType.VILLA,
];

export const STEP_FIELDS: Array<
  Array<
    keyof Omit<ResidentialPremises, "id" | "userId" | "createdAt" | "updatedAt">
  >
> = [
  [
    "title",
    "description",
    "price",
    "propertyType",
    "listingType",
    "rooms",
    "bedrooms",
    "bathrooms",
    "area",
  ],
  ["images"],
  ["location", "address"],
];

export const TOTAL_FORM_STEPS = 3;
export const INIT_FORM_STEP = 1;
