import { cloudinary } from "@/lib/cloudinary";
import { getAssetPublicId } from "@/utils/cloudinary";

export const deleteImagesByPublicIds = async (imageUrls: string[]) => {
  if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
    throw new Error("No valid publicIds provided");
  }

  const publicIds = imageUrls.map((imageUrl) => getAssetPublicId(imageUrl));

  return cloudinary.api.delete_resources(
    publicIds.map((id) => `listings/${id}`)
  );
};
