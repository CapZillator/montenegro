import { FC } from 'react';

import { getCloudinaryPathFromUrl } from '@/utils/cloudinary';

import { DEFAULT_IMAGE_VALUES } from './constants';
import { ImageProps } from './types';

export const ImageServer: FC<ImageProps> = ({
  path,
  alt,
  fullUrl,
  blur = false,
  className,
  widths = DEFAULT_IMAGE_VALUES.widths,
  sizes = DEFAULT_IMAGE_VALUES.sizes,
  baseUrl = DEFAULT_IMAGE_VALUES.baseUrl,
}) => {
  const rawPath = path ?? (fullUrl ? getCloudinaryPathFromUrl(fullUrl) : null);
  if (!rawPath) return null;

  const srcSet = widths
    .map((w) => `${baseUrl}/w_${w},f_auto,q_auto/${rawPath} ${w}w`)
    .join(', ');

  const fallbackSrc = `${baseUrl}/w_${widths[Math.floor(widths.length / 2)]},f_auto,q_auto/${rawPath}`;
  const style = blur
    ? {
        backgroundImage: `url(${baseUrl}/w_20,e_blur:1000,q_1/${rawPath})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  return (
    <img
      src={fallbackSrc}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
    />
  );
};
