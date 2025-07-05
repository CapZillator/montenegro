import { fetchPaths } from '@/constants/fetch';

export const geocodeAddress = async (
  query: string
): Promise<[number, number]> => {
  const response = await fetch(
    `${fetchPaths.internal.geo.geocode}/?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const data = await response.json();

  if (!data?.[0]) throw new Error('Address not found');

  return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
};
