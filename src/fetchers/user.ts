import { fetchPaths } from "@/constants/fetch";

export const checkUserFetcher = async () => {
  const response = await fetch(fetchPaths.internal.user.CHECK_USER);

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};
