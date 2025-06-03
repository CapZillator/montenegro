import { FC, ReactNode, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { useClickOutside } from "@/hooks/use-click-outside/useOutsideClick";
import { useDebounce } from "@/hooks/use-debounce/useDebounce";
import { useTranslation } from "@/hooks/use-translation/useTranslation";

import { Close } from "../../icons/actions/Close";
import { ChevronDown } from "../../icons/navigation/ChevronDown";
import { Checked } from "../../icons/state/Checked";
import { DROPDOWN_HEIGHT } from "./constants";
import { getLabel } from "./utils";

type Props = {
  values: { name: string; value: string | boolean }[];
  selectedValue: string | boolean | Array<string | boolean>;
  onUpdate: (value: string | boolean | Array<string | boolean>) => void;
  isOpenByDefault?: boolean;
  label?: string;
  frozenValues?: Array<string | boolean>;
  icon?: ReactNode;
  useValueAsName?: boolean;
  disabled?: boolean;
  searchEnabled?: boolean;
  controlButtonStyles?: string;
};

export const Dropdown: FC<Props> = ({
  values,
  selectedValue,
  onUpdate,
  isOpenByDefault,
  label,
  frozenValues,
  icon,
  useValueAsName,
  disabled,
  searchEnabled = false,
  controlButtonStyles,
}) => {
  const [isOpen, setIsOpen] = useState(Boolean(isOpenByDefault));
  const [openUpwards, setOpenUpwards] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isMultipleSelect = Array.isArray(selectedValue);

  const selectedValuesLabel = getLabel(
    values,
    selectedValue,
    useValueAsName,
    label
  );

  const onSelect = (value: string | boolean) => {
    if (frozenValues && frozenValues.includes(value)) return;
    setSearchTerm("");
    if (isMultipleSelect) {
      onUpdate(
        value === "any"
          ? []
          : selectedValue.includes(value)
            ? selectedValue.filter((selected) => selected !== value)
            : [...selectedValue, value]
      );

      return;
    }
    onUpdate(value === "any" ? "" : value);
    setIsOpen(false);
  };

  const clickOutsideCallback = () => {
    if (isOpen) {
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const showCheckedIcon = (value: string | boolean) =>
    isMultipleSelect ? selectedValue.includes(value) : false;

  useClickOutside(dropdownRef, clickOutsideCallback);

  const filteredValues = useMemo(() => {
    if (!searchEnabled || !debouncedSearchTerm.trim()) return values;
    const lowerTerm = debouncedSearchTerm.toLowerCase();

    return values.filter((v) => v.name.toLowerCase().includes(lowerTerm));
  }, [debouncedSearchTerm, values, searchEnabled]);

  return (
    <div
      ref={dropdownRef}
      className={twMerge(classNames("cursor-pointer", controlButtonStyles))}
    >
      <button
        className={twMerge(
          classNames(
            "flex items-center gap-2 text-primary rounded-sm bg-primary-content capitalize shadow-sm shadow-primary-content/40 duration-300 cursor-pointer",
            "hover:bg-secondary-content focus:bg-secondary-content disabled:bg-disable disabled:focus:outline-none disabled:text-primary-content/30",
            "px-3 py-1.5",
            controlButtonStyles
          )
        )}
        ref={buttonRef}
        onClick={() => {
          if (!isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;

            setOpenUpwards(spaceBelow < DROPDOWN_HEIGHT);
          }

          setIsOpen(!isOpen);
        }}
        type="button"
        {...{ disabled }}
      >
        {icon && <div>{icon}</div>}
        <div className="truncate grow text-start">
          {selectedValuesLabel ? (
            <>{selectedValuesLabel}</>
          ) : (
            <>{t("states.any")}</>
          )}
        </div>
        {isMultipleSelect && selectedValue.length > 1 ? (
          <span
            className={classNames(
              "text-sm bg-primary/30 px-1.5 text-primary rounded-sm"
            )}
          >
            {selectedValue.length}
          </span>
        ) : null}
        <ChevronDown
          className={twMerge(
            classNames("w-2.5 h-2.5 shrink-0 fill-primary duration-300", {
              "-scale-100": isOpen,
              "fill-primary-content/30": disabled,
            })
          )}
        />
      </button>

      {isOpen && (
        <div className="relative">
          <div
            className={classNames(
              "absolute bg-primary/90 rounded-sm text-primary-content shadow-sm shadow-primary-content/75",
              "backdrop-blur-sm min-w-full z-20",
              {
                "top-1.5": !openUpwards,
                "bottom-10": openUpwards,
              }
            )}
          >
            {searchEnabled && (
              <div className="relative mt-4 mb-2 mx-3 min-w-40">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={`${t("actions.search")}...`}
                  className={classNames(
                    "w-full pl-2 pr-7 py-1 text-sm bg-secondary rounded text-primary-content inset-shadow-sm inset-shadow-primary-content/20",
                    "focus:outline-2 focus:outline-primary-content/80 placeholder:text-primary-content/80"
                  )}
                />
                <button
                  type="button"
                  className={classNames(
                    "group absolute w-4 h-4 fill-secondary-content top-1/2 -translate-y-1/2 right-1.5 cursor-pointer"
                  )}
                  onClick={() => setSearchTerm("")}
                >
                  <Close
                    className={classNames(
                      "fill-primary-content duration-300 group-hover:fill-accent"
                    )}
                  />
                </button>
              </div>
            )}
            <ul className="overflow-y-auto scrollbar max-h-50 py-1 px-3">
              {filteredValues.map((value) => {
                const isShowCheckedIcon = showCheckedIcon(value.value);

                return (
                  <li
                    key={value.value.toString()}
                    onClick={() => onSelect(value.value)}
                    className={classNames(
                      "relative cursor-pointer hover:text-accent duration-300",
                      // {
                      //   "flex items-center gap-2": isMultipleSelect,
                      // }
                      {
                        "pl-5": isShowCheckedIcon,
                      }
                    )}
                  >
                    {isShowCheckedIcon && (
                      <Checked className="absolute left-0 top-1.5 w-2.5 h-2.5 fill-primary-content" />
                    )}
                    {value.name}
                  </li>
                );
              })}
              {filteredValues.length === 0 && (
                <li className="text-sm text-primary/75 py-1">
                  {t("states.nothingFound")}
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
