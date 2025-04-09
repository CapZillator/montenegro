import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { IconMap } from "./constants";
import { ButtonIcon } from "./enums";

export const getButtonIcon = (icon: ButtonIcon, className = "") =>
  IconMap[icon]({
    className: twMerge(classNames("w-4.5 h-4.5", className)),
  });
