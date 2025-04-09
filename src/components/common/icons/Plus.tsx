import * as React from "react"
import { SVGProps } from "react"

export const Plus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M9 17a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6V3a1 1 0 1 0-2 0v6H3a1 1 0 0 0 0 2h6v6z"
    />
  </svg>
)
