import { FC, ReactNode } from "react";
import { Control, Controller } from "react-hook-form";

import { InputContainer } from "../../inputs/input-container/InputContainer";
import { Switcher } from "../../inputs/switcher/Switcher";

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  icon?: ReactNode;
  disabled?: boolean;
  containerStyles?: string;
};

export const ControlledSwitcher: FC<Props> = ({
  name,
  control,
  label,
  icon,
  disabled,
  containerStyles,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <InputContainer
        error={fieldState.error?.message}
        {...{ name, label, icon, styles: containerStyles }}
      >
        <Switcher
          value={field.value}
          onChange={(value) => field.onChange(value)}
          {...{ disabled }}
        />
      </InputContainer>
    )}
  />
);
