"use client";

import { FC, ReactNode } from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

import { Button } from "@/components/common/button/Button";
import { ButtonIcon } from "@/components/common/button/enums";
import { Dropdown } from "@/components/common/dropdown/Dropdown";
import { useTranslation } from "@/hooks/use-translation/useTranslation";

import { DeleteStroke } from "../../icons/actions/DeleteStroke";
import { InputContainer } from "../input-container/InputContainer";
import { TextInput } from "../text-input/TextInput";

export enum MessengerType {
  TELEGRAM = "telegram",
  WHATSAPP = "whatsapp",
  VIBER = "viber",
}

const MESSENGER_OPTIONS: { name: string; value: MessengerType }[] = [
  { name: "Telegram", value: MessengerType.TELEGRAM },
  { name: "WhatsApp", value: MessengerType.WHATSAPP },
  { name: "Viber", value: MessengerType.VIBER },
];

type ContactMethod = {
  type: MessengerType;
  contact: string;
};

type FormValues = {
  phone: string;
  contacts?: ContactMethod[];
};

type Props = {
  control: Control<FormValues>;
  label?: string;
  disabled?: boolean;
  containerStyles?: string;
  icon?: ReactNode;
  submitButton?: ReactNode;
};

export const ContactMethodInput: FC<Props> = ({
  control,
  label,
  disabled,
  containerStyles,
  icon,
  submitButton,
}) => {
  const { fields, append, remove } = useFieldArray<FormValues, "contacts">({
    control,
    name: "contacts",
  });
  const { t } = useTranslation();

  // Watch the contacts array for changes
  const contacts = useWatch({
    control,
    name: "contacts",
    defaultValue: [],
  }) as ContactMethod[];

  const getAvailableOptions = (currentIndex: number) => {
    const selectedTypes = contacts
      .map((contact, index) => (index !== currentIndex ? contact?.type : null))
      .filter(Boolean) as MessengerType[];

    return MESSENGER_OPTIONS.filter(
      (option) =>
        !selectedTypes.includes(option.value) ||
        (currentIndex !== -1 && contacts[currentIndex]?.type === option.value)
    );
  };

  const handleAddContact = () => {
    const availableTypes = getAvailableOptions(-1);
    if (availableTypes.length > 0) {
      append({ type: availableTypes[0].value, contact: "" });
    }
  };

  return (
    <InputContainer
      error={undefined} // TODO: Add error handling
      name="contacts"
      {...{ label, icon }}
    >
      <div className={twMerge(classNames("space-y-2", containerStyles))}>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <Controller
              name={`contacts.${index}.type`}
              control={control}
              render={({ field: typeField }) => {
                const availableOptions = getAvailableOptions(index);

                return (
                  <Dropdown
                    values={availableOptions}
                    selectedValue={typeField.value}
                    onUpdate={(value) => {
                      // Only allow updating to available options
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
              name={`contacts.${index}.contact`}
              control={control}
              render={() => (
                <TextInput
                  name={`contacts.${index}.contact`}
                  control={control}
                  placeholder="Username or phone number"
                  disabled={disabled}
                />
              )}
            />
            <button
              className="w-5 h-5 cursor-pointer group "
              type="button"
              onClick={() => remove(index)}
              disabled={disabled}
            >
              <DeleteStroke className="stroke-primary-content duration-300 group-hover:stroke-secondary-content" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <Button
            type="button"
            onClick={handleAddContact}
            disabled={disabled || fields.length >= 3}
            icon={ButtonIcon.ADD}
            iconClassName="stroke-primary"
          >
            <span>{t("actions.add")}</span>
          </Button>
          {submitButton}
        </div>
      </div>
    </InputContainer>
  );
};
