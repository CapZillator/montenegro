import * as React from 'react';
import { SVGProps } from 'react';

export const Filter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M4 5h6m0 0a2 2 0 1 0 4 0m-4 0a2 2 0 1 1 4 0m0 0h6M4 12h12m0 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm-8 7h12M8 19a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"
    />
  </svg>
);
