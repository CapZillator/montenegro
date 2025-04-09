import * as React from "react";
import { SVGProps } from "react";

export const Door = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path d="M30 28.75h-.75V4c0-.69-.56-1.25-1.25-1.25h-6a1.25 1.25 0 0 0 0 2.5h4.75V30c.001.69.56 1.249 1.25 1.25h2a1.25 1.25 0 0 0 0-2.5zM17.77.767l-11.977 2A1.253 1.253 0 0 0 4.749 4v24.75h-2.75a1.25 1.25 0 0 0 0 2.5h15.977a1.252 1.252 0 0 0 1.25-1.25V1.999A1.25 1.25 0 0 0 17.762.767l.007-.001zM7.25 28.75V5.059l9.477-1.583V28.75zm7.33-13.63a1.817 1.817 0 0 0-.39-.275l-.01-.005a1.321 1.321 0 0 0-.969.003l.009-.003c-.157.068-.29.163-.4.28l-.001.001a1.297 1.297 0 0 0-.276.391l-.003.008a1.186 1.186 0 0 0 .003.968l-.003-.008c.071.156.165.288.279.4.11.117.244.212.393.276l.008.003a1.47 1.47 0 0 0 .97-.003l-.01.003c.153-.079.284-.172.401-.28l-.001.001c.108-.112.196-.245.257-.392l.003-.008a1.202 1.202 0 0 0-.003-.968l.003.008a1.28 1.28 0 0 0-.26-.4z" />
  </svg>
);
