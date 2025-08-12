import * as React from 'react';
import { SVGProps } from 'react';

export const TransitStop = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M5 20.816v.684a1.5 1.5 0 0 0 3 0V21h8v.5a1.5 1.5 0 0 0 3 0v-.684A3 3 0 0 0 21 18V4a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v14a3 3 0 0 0 2 2.816ZM5 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1H5Zm0 3h14v6H5Zm0 8h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Zm1 2a1 1 0 1 1 1 1 1 1 0 0 1-1-1Zm10 0a1 1 0 1 1 1 1 1 1 0 0 1-1-1Z"
    />
  </svg>
);
