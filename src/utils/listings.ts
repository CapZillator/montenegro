export const getFullAddress = (city: string, address?: string) =>
  `${city}${address ? `, ${address}` : ""}`;
