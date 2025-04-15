export type InternalApiResponse<K extends string, T> = {
  ok?: boolean;
} & Record<K, T>;
