export const getAssetPublicId = (url: string) =>
  url.split("/").pop()?.split(".")[0];
