import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { formatNumberToFinancialAmount } from "@/formatters/finance";
import { parseNumberFromString } from "@/utils/parsers";

import { InputContainer } from "../input-container/InputContainer";

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  containerStyles?: string;
  inputContainerStyles?: string;
  icon?: ReactNode;
};

export const MoneyInput: FC<Props> = ({
  name,
  control,
  label,
  placeholder,
  disabled,
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
        <div className={twMerge(classNames("relative", inputContainerStyles))}>
          <input
            {...field}
            placeholder={placeholder}
            onChange={(event) => {
              const start = event.target.selectionStart;

              window.requestAnimationFrame(() => {
                event.target.selectionStart = start;
                event.target.selectionEnd = start;
              });

              const formattedValue = parseNumberFromString(event.target.value);
              field.onChange(formattedValue);
            }}
            value={
              field.value ? formatNumberToFinancialAmount(field.value) : ""
            }
            className={twMerge(
              classNames(
                "pl-2 pr-10 py-1.5 rounded-sm w-full inset-shadow-sm inset-shadow-primary-content/20",
                "bg-secondary text-primary-content focus:outline-2 focus:outline-primary-content/80",
                "disabled:bg-disable disabled:text-primary-content/30",
                {
                  "outline-2 outline-secondary-content":
                    fieldState.error?.message,
                }
              )
            )}
            {...{ disabled }}
          />
          <span
            className={twMerge(
              classNames(
                "absolute top-1/2 right-2.5 text-primary-content -translate-y-1/2 text-lg font-medium",
                {
                  "text-primary-content/30": disabled,
                }
              )
            )}
          >
            €
          </span>
        </div>
      </InputContainer>
    )}
  />
);
