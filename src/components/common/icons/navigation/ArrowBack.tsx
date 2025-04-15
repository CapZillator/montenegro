import * as React from "react";
import { SVGProps } from "react";

export const ArrowBack = (props: SVGProps<SVGSVGElement>) => (
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
      d="m8 17-5-5m0 0 5-5m-5 5h18"
    />
  </svg>
);
