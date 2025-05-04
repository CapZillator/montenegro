import { forwardRef, ReactNode, Ref } from "react";
import classNames from "classnames";

import { ChevronDown } from "@/components/common/icons/navigation/ChevronDown";

import { DropdownMenu } from "./components/dropdown-menu/DropdownMenu";

type Props = {
  isOpen: boolean;
  buttonChildren: ReactNode;
  menuChildren: ReactNode;
  onToggle: (isOpen: boolean) => void;
};

export const Dropdown = forwardRef<HTMLDivElement, Props>(
  (
    { isOpen, buttonChildren, menuChildren, onToggle },
    ref: Ref<HTMLDivElement>
  ) => {
    const onToggleDropdown = () => onToggle(!isOpen);

    return (
      <div className="flex items-center relative h-8" ref={ref}>
        <button
          className={classNames("flex items-center gap-3 p-1 cursor-pointer")}
          onClick={onToggleDropdown}
        >
          {buttonChildren}
          <ChevronDown
            className={classNames("w-3 fill-primary-content duration-300", {
              "-scale-100": isOpen,
            })}
          />
        </button>
        {isOpen && <DropdownMenu>{menuChildren}</DropdownMenu>}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
