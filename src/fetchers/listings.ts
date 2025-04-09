import { fetchPaths } from "@/constants/fetch";
import { ResidentialPremises } from "@/types/realEstate";

export const addListingFetcher = async (
  data: Omit<ResidentialPremises, "id" | "userId" | "createdAt" | "updatedAt">
) => {
  const response = await fetch(fetchPaths.internal.listings.ADD_LISTING, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};
