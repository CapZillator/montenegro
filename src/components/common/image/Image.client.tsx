'use client';

import { FC, useState } from 'react';
import classNames from 'classnames';

import { getCloudinaryPathFromUrl } from '@/utils/cloudinary';

import { DEFAULT_IMAGE_VALUES } from './constants';
import { ImageProps } from './types';

type Props = {
  onClick?: () => void;
} & ImageProps;

export const ImageClient: FC<Props> = ({
  path,
  alt,
  fullUrl,
  blur = true,
  className,
  widths = DEFAULT_IMAGE_VALUES.widths,
  sizes = DEFAULT_IMAGE_VALUES.sizes,
  baseUrl = DEFAULT_IMAGE_VALUES.baseUrl,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  const rawPath = path ?? (fullUrl ? getCloudinaryPathFromUrl(fullUrl) : null);
  if (!rawPath) return null;

  const srcSet = widths
    .map((w) => `${baseUrl}/w_${w},f_auto,q_auto/${rawPath} ${w}w`)
    .join(', ');

  const fallbackSrc = `${baseUrl}/w_${widths[Math.floor(widths.length / 2)]},f_auto,q_auto/${rawPath}`;

  const blurSrc = `${baseUrl}/w_20,e_blur:1000,q_1/${rawPath}`;

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick ? (event) => event.key === 'Enter' && onClick() : undefined
      }
    >
      {blur && (
        <img
          src={blurSrc}
          aria-hidden
          alt=""
          className={classNames(
            'absolute inset-0 w-full h-full object-cover scale-110 blur-xl transition-opacity duration-500',
            { 'opacity-100': !loaded, 'opacity-0': loaded }
          )}
        />
      )}
      <img
        src={fallbackSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        onLoad={() => setLoaded(true)}
        loading="lazy"
        decoding="async"
        className={classNames(
          'relative w-full h-auto object-cover transition-opacity duration-300',
          { 'opacity-0': !loaded },
          className
        )}
      />
    </div>
  );
};

export default ImageClient;
