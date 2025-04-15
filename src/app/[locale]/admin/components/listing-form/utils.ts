import { ResidentialPremises } from "@/types/realEstate";

export const normalizeListingData = (
  data: Partial<ResidentialPremises>
): Partial<ResidentialPremises> => {
  return {
    ...data,
    price:
      data.price !== undefined && data.price !== null
        ? Number(data.price)
        : undefined,
    buildingYear: data.buildingYear ?? undefined,
    latitude: data.latitude ?? undefined,
    longitude: data.longitude ?? undefined,
    deposit:
      data.deposit !== undefined && data.deposit !== null
        ? Number(data.deposit)
        : undefined,
    floor: data.floor ?? undefined,
    totalFloors: data.totalFloors ?? undefined,
    balcony: data.balcony ?? undefined,
    furnished: data.furnished ?? undefined,
    parking: data.parking ?? undefined,
    airConditioner: data.airConditioner ?? undefined,
    petsAllowed: data.petsAllowed ?? undefined,
    heating: data.heating ?? undefined,
    address: data.address ?? undefined,
  };
};
