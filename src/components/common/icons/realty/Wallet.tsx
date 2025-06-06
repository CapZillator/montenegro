import * as React from "react";
import { SVGProps } from "react";

export const Wallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 8v-.8c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C16.48 4 15.92 4 14.8 4H6.2c-1.12 0-1.68 0-2.108.218a2 2 0 0 0-.874.874C3 5.52 3 6.08 3 7.2V8m18 4h-2a2 2 0 1 0 0 4h2M3 8v8.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874C4.52 20 5.08 20 6.2 20h11.6c1.12 0 1.68 0 2.108-.218a2 2 0 0 0 .874-.874C21 18.48 21 17.92 21 16.8v-5.6c0-1.12 0-1.68-.218-2.108a2 2 0 0 0-.874-.874C19.48 8 18.92 8 17.8 8H3Z"
    />
  </svg>
);
