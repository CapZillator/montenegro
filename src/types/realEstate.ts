import { ListingType,ResidentialPremisesType } from "@/enums/listing";

export type ResidentialPremises = {
  id: string;
  userId: string;
  title: Record<string, string>;
  description: Record<string, string>;
  price: number;
  propertyType: ResidentialPremisesType;
  listingType: ListingType;
  rooms: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  floor?: number;
  totalFloors?: number;
  buildingYear?: number;
  furnished?: boolean;
  balcony?: number;
  parking?: boolean;
  heating?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  deposit?: number;
  petsAllowed?: boolean;
};
