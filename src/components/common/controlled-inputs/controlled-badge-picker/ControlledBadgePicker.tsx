import { FC, ReactNode,SVGProps } from 'react';
import { Control, Controller } from 'react-hook-form';

import { BadgePicker } from '../../inputs/badge-picker/BadgePicker';
import { InputContainer } from '../../inputs/input-container/InputContainer';

type Props = {
  name: string;
  control: Control<any, any>;
  label?: string;
  values: { name: string; value: string; icon?: FC<SVGProps<SVGSVGElement>> }[];
  icon?: ReactNode;
  disabled?: boolean;
  containerStyles?: string;
};

export const ControlledBadgePicker: FC<Props> = ({
  name,
  control,
  label,
  values,
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
        <BadgePicker
          onUpdate={(value) => field.onChange(value)}
          selectedValues={field.value}
          {...{
            values,
            disabled,
          }}
        />
      </InputContainer>
    )}
  />
);
