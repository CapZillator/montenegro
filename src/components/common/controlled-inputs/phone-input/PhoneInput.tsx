"use client";

import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { formatPhoneNumber } from "@/formatters/contacts";

import { InputContainer } from "../../inputs/input-container/InputContainer";

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  containerStyles?: string;
  icon?: ReactNode;
};

export const PhoneInput: FC<Props> = ({
  name,
  control,
  label,
  placeholder = "+123 4567 890",
  disabled,
  containerStyles,
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
        <div className={twMerge(classNames("relative flex items-center"))}>
          <input
            {...field}
            placeholder={placeholder}
            onChange={(event) => {
              const formatted = formatPhoneNumber(event.target.value);
              field.onChange(formatted);
            }}
            value={field.value ?? ""}
            className={twMerge(
              classNames(
                "pl-2 pr-2 py-1.5 rounded-sm w-full inset-shadow-sm inset-shadow-primary-content/20",
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
        </div>
      </InputContainer>
    )}
  />
);
