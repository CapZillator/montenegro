import { fetchPaths } from "@/constants/fetch";
import { ResidentialPremises } from "@/types/realEstate";
import { toCamelCase } from "@/utils/api";

export const addListingFetcher = async (
  data: Omit<ResidentialPremises, "id" | "userId" | "createdAt" | "updatedAt">
) => {
  const response = await fetch(fetchPaths.internal.user.LISTINGS, {
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

export const updateListingFetcher = async (
  data: Omit<ResidentialPremises, "userId" | "createdAt" | "updatedAt">
) => {
  const response = await fetch(fetchPaths.internal.user.LISTINGS, {
    method: "PUT",
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

export const userListingsFetcher = async (listingId?: string) => {
  const response = await fetch(
    listingId
      ? `${fetchPaths.internal.user.LISTINGS}?listingId=${listingId}`
      : fetchPaths.internal.user.LISTINGS
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const listings = await response.json();

  return listings.listings.map((listing: Record<string, any>) =>
    toCamelCase(listing)
  ) as ResidentialPremises[];
};

export const deleteListingFetcher = async (listingId: string) => {
  const response = await fetch(fetchPaths.internal.user.LISTINGS, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: listingId }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};
