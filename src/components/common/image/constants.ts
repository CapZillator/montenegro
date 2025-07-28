// https://res.cloudinary.com/dpbgqgphr/image/upload/v1752174802/listings/qfs59pt8brmqwp03wusl.jpg
export const DEFAULT_IMAGE_VALUES = {
  widths: [400, 800, 1200],
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px',
  baseUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
};
