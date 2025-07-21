import { FETCH_PATHS } from '@/constants/fetch';

export const uploadImageFetcher = async (formData: FormData) => {
  const response = await fetch(FETCH_PATHS.internal.image.manageListingImages, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  const images = await response.json();

  return images;
};

export const deleteListingImageFetcher = async (publicIds: string[]) => {
  const response = await fetch(FETCH_PATHS.internal.image.manageListingImages, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ publicIds }),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
};
