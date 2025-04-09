import * as React from "react";
import { SVGProps } from "react";

export const Contacts = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 12a9 9 0 1 1 4.873 8c-.771-.398-3.752 1.595-4.373 1-.613-.587 1.132-3.76.704-4.5A8.959 8.959 0 0 1 3 12Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m7 13 4-2.5 1.5 2.5 4-2.5"
    />
  </svg>
);
