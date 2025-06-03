import { FC, ReactNode } from "react";
import classNames from "classnames";

type Props = {
  onClick: () => void;
  isDisabled?: boolean;
  children: ReactNode;
};

export const ImageButton: FC<Props> = ({ onClick, isDisabled, children }) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={classNames(
      "group p-1.5 bg-primary/80 rounded-sm shadow-sm shadow-primary-content/40 cursor-pointer duration-300 backdrop-blur-sm hover:bg-primary-content"
    )}
  >
    {children}
  </button>
);
