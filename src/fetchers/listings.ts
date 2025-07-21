import { FETCH_PATHS } from '@/constants/fetch';
import { ListingState } from '@/enums/listing';
import { ResidentialPremises } from '@/types/realEstate';
import { toCamelCase } from '@/utils/api';

export const addListingFetcher = async (
  data: Omit<
    ResidentialPremises,
    'id' | 'userId' | 'state' | 'createdAt' | 'updatedAt'
  >
) => {
  const response = await fetch(FETCH_PATHS.internal.user.listings, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};

export const updateListingFetcher = async (
  data: Omit<
    ResidentialPremises,
    'userId' | 'state' | 'createdAt' | 'updatedAt'
  >
) => {
  const response = await fetch(FETCH_PATHS.internal.user.listings, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
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
      ? `${FETCH_PATHS.internal.user.listings}?listingId=${listingId}`
      : FETCH_PATHS.internal.user.listings
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const listings = await response.json();

  return listings.listings.map((listing: Record<string, any>) => {
    const camel = toCamelCase(listing);

    return {
      ...camel,
      latitude: camel.latitude ? parseFloat(camel.latitude) : undefined,
      longitude: camel.longitude ? parseFloat(camel.longitude) : undefined,
    };
  }) as ResidentialPremises[];
};

export const deleteListingFetcher = async (listingId: string) => {
  const response = await fetch(FETCH_PATHS.internal.user.listings, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: listingId }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};

export const updateListingStateFetcher = async (
  id: string,
  state: ListingState
) => {
  const response = await fetch(FETCH_PATHS.internal.user.listingStatus, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, state }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};
