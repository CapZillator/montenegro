import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { parseNumberFromString } from "@/utils/parsers";

import { InputContainer } from "../../inputs/input-container/InputContainer";

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  measurementUnitBadge?: string | ReactNode;
  containerStyles?: string;
  inputContainerStyles?: string;
  icon?: ReactNode;
};

export const NumericInput: FC<Props> = ({
  name,
  control,
  label,
  placeholder,
  disabled,
  measurementUnitBadge,
  containerStyles,
  inputContainerStyles,
  icon,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <InputContainer
        error={fieldState.error?.message}
        {...{ name, label, icon, styles: containerStyles }}
      >
        <div
          className={twMerge(
            classNames("relative flex items-center", inputContainerStyles)
          )}
        >
          <input
            {...field}
            placeholder={placeholder}
            onChange={(event) =>
              field.onChange(parseNumberFromString(event.target.value))
            }
            value={field.value ?? ""}
            className={twMerge(
              classNames(
                "pl-2 pr-2 py-1.5 rounded-sm w-full inset-shadow-sm inset-shadow-primary-content/20",
                "bg-secondary text-primary-content focus:outline-2 focus:outline-primary-content/80",
                "disabled:bg-disable disabled:text-primary-content/30",
                {
                  "outline-2 outline-secondary-content":
                    fieldState.error?.message,
                  "pr-10": measurementUnitBadge,
                }
              )
            )}
            {...{ disabled }}
          />
          {measurementUnitBadge && (
            <div
              className={twMerge(
                classNames(
                  "absolute top-1/2 right-2.5 text-primary-content -translate-y-1/2 text-md font-medium",
                  {
                    "text-primary-content/30": disabled,
                  }
                )
              )}
            >
              {measurementUnitBadge}
            </div>
          )}
        </div>
      </InputContainer>
    )}
  />
);
