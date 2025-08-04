import { FC, ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

import { CurrencySymbols } from '@/constants/currency';
import { useCurrency } from '@/context/currency/Currency';
import { formatNumberToFinancialAmount } from '@/formatters/finance';
import { useExchangeRates } from '@/hooks/use-exchange-rates/useExchangeRates';
import { Currency } from '@/types/currency';
import { convertCurrency } from '@/utils/currency';
import { parseNumberFromString } from '@/utils/parsers';

import { InputContainer } from '../../inputs/input-container/InputContainer';

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
}) => {
  const { data: rates } = useExchangeRates();
  const { currency } = useCurrency();

  if (!rates) return null;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const price = convertCurrency(
          field.value,
          Currency.USD,
          currency,
          rates
        );

        return (
          <InputContainer
            error={fieldState.error?.message}
            {...{ name, label, icon, styles: containerStyles }}
          >
            <div
              className={twMerge(classNames('relative', inputContainerStyles))}
            >
              <input
                {...field}
                placeholder={placeholder}
                onChange={(event) => {
                  const start = event.target.selectionStart;

                  window.requestAnimationFrame(() => {
                    event.target.selectionStart = start;
                    event.target.selectionEnd = start;
                  });

                  const parsedValue = parseNumberFromString(event.target.value);
                  const convertedPrice = convertCurrency(
                    parsedValue,
                    currency,
                    Currency.USD,
                    rates
                  );
                  field.onChange(convertedPrice);
                }}
                value={price ? formatNumberToFinancialAmount(price) : ''}
                className={twMerge(
                  classNames(
                    'pl-2 pr-10 py-1.5 rounded-sm w-full inset-shadow-sm inset-shadow-primary-content/20',
                    'bg-secondary text-primary-content focus:outline-2 focus:outline-primary-content/80',
                    'disabled:bg-disable disabled:text-primary-content/30',
                    {
                      'outline-2 outline-secondary-content':
                        fieldState.error?.message,
                    }
                  )
                )}
                {...{ disabled }}
              />
              <span
                className={twMerge(
                  classNames(
                    'absolute top-1/2 right-2.5 text-primary-content -translate-y-1/2 text-lg font-medium',
                    {
                      'text-primary-content/30': disabled,
                    }
                  )
                )}
              >
                {CurrencySymbols[currency]}
              </span>
            </div>
          </InputContainer>
        );
      }}
    />
  );
};
