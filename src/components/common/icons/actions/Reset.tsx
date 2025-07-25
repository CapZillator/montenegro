import * as React from 'react';
import { SVGProps } from 'react';

export const Reset = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" {...props}>
    <path
      stroke="none"
      d="M17 9a1 1 0 0 1-1-1c0-.551-.448-1-1-1H5.414l1.293 1.293a.999.999 0 1 1-1.414 1.414l-3-3a.999.999 0 0 1 0-1.414l3-3a.997.997 0 0 1 1.414 0 .999.999 0 0 1 0 1.414L5.414 5H15c1.654 0 3 1.346 3 3a1 1 0 0 1-1 1zM3 11a1 1 0 0 1 1 1c0 .551.448 1 1 1h9.586l-1.293-1.293a.999.999 0 1 1 1.414-1.414l3 3a.999.999 0 0 1 0 1.414l-3 3a.999.999 0 1 1-1.414-1.414L14.586 15H5c-1.654 0-3-1.346-3-3a1 1 0 0 1 1-1z"
    />
  </svg>
);
