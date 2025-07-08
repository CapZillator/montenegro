import * as React from 'react';
import { SVGProps } from 'react';

export const FindOnMap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="-0.5 0 25 25"
    {...props}
  >
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M20 12.48V7.32a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h6.53M17.03 12.48 2.82 4.89M3.58 20.51 9.9 8.68"
    />
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.44 22.21a3.44 3.44 0 1 0 0-6.88 3.44 3.44 0 0 0 0 6.88ZM23 23.32l-2.12-2.12"
    />
  </svg>
);
