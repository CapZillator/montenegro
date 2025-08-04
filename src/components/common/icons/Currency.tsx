import * as React from 'react';
import { SVGProps } from 'react';

export const Currency = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g id="transfer_money" data-name="transfer money">
      <circle
        cx={12.04}
        cy={12}
        r={2.87}
        style={{
          strokeLinecap: 'square',
          fill: 'none',
          strokeMiterlimit: 10,
          strokeWidth: '1.92px',
        }}
      />
      <path
        d="M22.58 6.25v9.58a2.87 2.87 0 0 1-2.87 2.88H7.25l3.83 3.83M4.38 12h1.91M17.79 12h1.92M1.5 17.75V8.17a2.88 2.88 0 0 1 2.88-2.88h12.45L13 1.46"
        style={{
          fill: 'none',
          strokeMiterlimit: 10,
          strokeWidth: '1.92px',
        }}
      />
    </g>
  </svg>
);
