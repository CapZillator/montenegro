import * as React from 'react';
import { SVGProps } from 'react';

export const ChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 -0.5 17 17"
    {...props}
  >
    <path
      stroke="none"
      fillRule="evenodd"
      d="M6.077 1.162c0 .225.062.45.196.65l4.156 6.229-4.197 6.037a1.175 1.175 0 0 0 .328 1.629 1.174 1.174 0 0 0 1.63-.325l4.63-6.688c.264-.394.266-.908.002-1.304L8.233.51a1.178 1.178 0 0 0-2.156.652Z"
      className="si-glyph-fill"
    />
  </svg>
);
