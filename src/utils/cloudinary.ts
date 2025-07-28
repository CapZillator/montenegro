export const getAssetPublicId = (url: string) =>
  url.split('/').pop()?.split('.')[0];

export const getCloudinaryPathFromUrl = (fullUrl: string): string | null => {
  const match = fullUrl.match(/\/upload\/(.*)$/);

  return match ? match[1] : null;
};
