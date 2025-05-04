import { FC, ReactNode } from "react";
import classNames from "classnames";

type Props = {
  children: ReactNode;
};

export const DropdownMenu: FC<Props> = ({ children }) => (
  <ul
    className={classNames(
      "absolute -bottom-4 translate-y-full right-0 px-5 py-3 flex flex-col border-1 border-divider/25 gap-1 bg-primary rounded-sm shadow-md"
    )}
  >
    {children}
  </ul>
);
