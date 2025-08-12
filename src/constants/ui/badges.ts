import { NearbyAmenities } from '@/types/realEstate';
import {
  SupermarketIcon,
  MarketIcon,
  RestaurantIcon,
  CafeIcon,
  CoffeeIcon,
  SchoolIcon,
  ParkIcon,
  GymIcon,
  PharmacyIcon,
  MallIcon,
  TransitStopIcon,
} from '@/components/common/icons';

export const NEARBY_AMENITIES_ICON_MAP = {
  [NearbyAmenities.SUPERMARKET]: SupermarketIcon,
  [NearbyAmenities.MARKET]: MarketIcon,
  [NearbyAmenities.RESTAURANT]: RestaurantIcon,
  [NearbyAmenities.CAFE]: CafeIcon,
  [NearbyAmenities.COFFEE_SHOP]: CoffeeIcon,
  [NearbyAmenities.SCHOOL]: SchoolIcon,
  [NearbyAmenities.PARK]: ParkIcon,
  [NearbyAmenities.GYM]: GymIcon,
  [NearbyAmenities.PHARMACY]: PharmacyIcon,
  [NearbyAmenities.MALL]: MallIcon,
  [NearbyAmenities.TRANSIT_STOP]: TransitStopIcon,
};
