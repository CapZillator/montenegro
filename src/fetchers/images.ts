import { fetchPaths } from "@/constants/fetch";

export const uploadImageFetcher = async (formData: FormData) => {
  const response = await fetch(fetchPaths.internal.image.MANAGE_LISTING_IMAGE, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const images = await response.json();

  return images;
};

export const deleteListingImageFetcher = async (publicIds: string[]) => {
  const response = await fetch(fetchPaths.internal.image.MANAGE_LISTING_IMAGE, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ publicIds }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};
