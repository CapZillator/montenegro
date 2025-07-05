import * as React from 'react';
import { SVGProps } from 'react';

export const Funnel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 3H5a2 2 0 0 0-2 2v1.172a2 2 0 0 0 .586 1.414l5.828 5.828A2 2 0 0 1 10 14.828V20.286a.71.71 0 0 0 1.212.502L12 20l1.414-1.414A2 2 0 0 0 14 17.172v-2.344a2 2 0 0 1 .586-1.414l5.828-5.828A2 2 0 0 0 21 6.172V5a2 2 0 0 0-2-2Z"
    />
  </svg>
);
