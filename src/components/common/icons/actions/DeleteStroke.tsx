import { SVGProps } from "react";

export const DeleteStroke = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      d="M16 7V4a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
    <path
      d="M18 20V7H6v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM4 7h16"
      style={{
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
      }}
    />
  </svg>
);
