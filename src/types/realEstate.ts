import { ListingType, ResidentialPremisesType } from '@/enums/listing';

export enum NearbyAmenities {
  SUPERMARKET = 'supermarket',
  MARKET = 'market',
  RESTAURANT = 'restaurant',
  CAFE = 'cafe',
  COFFEE_SHOP = 'coffeeShop',
  SCHOOL = 'school',
  PARK = 'park',
  GYM = 'gym',
  PHARMACY = 'pharmacy',
  MALL = 'mall',
  TRANSIT_STOP = 'transitStop',
}

export type ResidentialPremises = {
  id: string;
  state: number;
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
  nearbyAmenities?: string[];
  deposit?: number;
  petsAllowed?: boolean;
  airConditioner?: boolean;
};
