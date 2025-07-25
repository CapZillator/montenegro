'use client';

import { FC, ReactNode } from 'react';
import { Control, Controller, useFieldArray } from 'react-hook-form';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import { Button } from '@/components/common/button/Button';
import { ButtonIcon } from '@/components/common/button/enums';
import { Dropdown } from '@/components/common/inputs/dropdown/Dropdown';
import { Messengers } from '@/enums/user';
import { useTranslation } from '@/hooks/use-translation/useTranslation';
import { User } from '@/types/user';

import { DeleteStroke } from '../../icons/actions/DeleteStroke';
import { InputContainer } from '../../inputs/input-container/InputContainer';
import { TextInput } from '../text-input/TextInput';
import { MESSENGER_OPTIONS } from './constants';

type Props = {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  containerStyles?: string;
  icon?: ReactNode;
  submitButton?: ReactNode;
};

export const ContactMethodInput: FC<Props> = ({
  name,
  control,
  label,
  disabled,
  containerStyles,
  icon,
  submitButton,
}) => {
  const { fields, append, remove } = useFieldArray<User, 'contacts'>({
    control,
    name: 'contacts',
  });

  const { t } = useTranslation();

  const getAvailableOptions = (currentIndex: number) => {
    const selectedTypes = fields
      .map((contact, index) => (index !== currentIndex ? contact?.type : null))
      .filter(Boolean) as Messengers[];

    return MESSENGER_OPTIONS.filter(
      (option) =>
        !selectedTypes.includes(option.value) ||
        fields[currentIndex]?.type === option.value
    );
  };

  const handleAddContact = () => {
    const availableTypes = getAvailableOptions(-1);
    if (availableTypes.length > 0) {
      append({ type: availableTypes[0].value, contact: '' });
    }
  };

  return (
    <InputContainer
      error={undefined}
      name={name}
      {...{ label, icon, styles: containerStyles }}
    >
      <div className={twMerge(classNames('space-y-3'))}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-3">
            <Controller
              name={`${name}.${index}.type`}
              control={control}
              render={({ field: typeField }) => {
                const availableOptions = getAvailableOptions(index);

                return (
                  <Dropdown
                    values={availableOptions}
                    selectedValue={typeField.value}
                    onUpdate={(value) => {
                      if (availableOptions.some((opt) => opt.value === value)) {
                        typeField.onChange(value);
                      }
                    }}
                    disabled={disabled}
                    controlButtonStyles="w-32"
                  />
                );
              }}
            />
            <Controller
              name={`${name}.${index}.contact`}
              control={control}
              render={() => (
                <TextInput
                  name={`${name}.${index}.contact`}
                  control={control}
                  placeholder="Username or phone number"
                  disabled={disabled}
                />
              )}
            />
            <button
              className="w-6 h-6 shrink-0 cursor-pointer group"
              type="button"
              onClick={() => remove(index)}
              disabled={disabled}
            >
              <DeleteStroke className="stroke-primary-content duration-300 group-hover:stroke-secondary-content" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          {fields.length < 3 ? (
            <Button
              type="button"
              onClick={handleAddContact}
              disabled={disabled}
              icon={ButtonIcon.ADD}
              iconClassName="w-5 h-5"
            >
              <span>{t('actions.add')}</span>
            </Button>
          ) : null}

          {submitButton}
        </div>
      </div>
    </InputContainer>
  );
};
