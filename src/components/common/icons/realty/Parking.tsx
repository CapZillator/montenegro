import * as React from "react";
import { SVGProps } from "react";

export const Parking = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      fillRule="evenodd"
      d="M11 6a3 3 0 0 0-3 3v8a1 1 0 1 0 2 0v-3h2.005a4.688 4.688 0 0 0 1.943-.48 3.632 3.632 0 0 0 1.415-1.231c.403-.604.637-1.364.637-2.289s-.234-1.685-.637-2.29a3.632 3.632 0 0 0-1.416-1.23 4.686 4.686 0 0 0-1.314-.42A3.882 3.882 0 0 0 12 6h-1Zm-1 6V9a1 1 0 0 1 1-1h1c.36.012.732.109 1.053.27.256.128.482.304.646.55.16.24.301.605.301 1.18s-.14.94-.3 1.18c-.165.246-.39.422-.647.55-.321.161-.693.258-1.053.27h-2Z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M20 1a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3h16Zm0 2a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16Z"
      clipRule="evenodd"
    />
  </svg>
);
