import { Path, UseFormTrigger } from 'react-hook-form';

import { Button } from '../button/Button';
import { ButtonIcon } from '../button/enums';

type Props<T extends Record<string, any>> = {
  currentStep: number;
  totalSteps: number;
  stepFields: (keyof T)[][];
  isSubmitting: boolean;
  isUpdate: boolean;
  onStepChange: (step: number) => void;
  onTrigger: UseFormTrigger<T>;
  onSubmit: () => void;
  t: (key: string) => string;
};

export const FormNavigation = <T extends Record<string, any>>({
  currentStep,
  totalSteps,
  stepFields,
  isSubmitting,
  isUpdate,
  onStepChange,
  onTrigger,
  onSubmit,
  t,
}: Props<T>) => (
  <div className="flex gap-3">
    {currentStep > 1 && (
      <Button
        type="button"
        onClick={() => onStepChange(currentStep - 1)}
        disabled={isSubmitting}
        icon={ButtonIcon.BACK}
        iconClassName="scale-x-[-1] h-3 w-3"
      >
        {t('actions.back')}
      </Button>
    )}
    {currentStep === totalSteps || isUpdate ? (
      <Button
        type="submit"
        disabled={isSubmitting}
        onClick={onSubmit}
        icon={ButtonIcon.SAVE}
      >
        <span>{t(isUpdate ? 'actions.save' : 'actions.done')}</span>
      </Button>
    ) : null}
    {currentStep < totalSteps && (
      <Button
        type="button"
        onClick={async () => {
          const isValid = await onTrigger(
            stepFields[currentStep - 1] as Path<T>[]
          );
          if (isValid) {
            onStepChange(currentStep + 1);
          }
        }}
        disabled={isSubmitting}
        icon={ButtonIcon.NEXT}
        iconClassName="h-3 w-3"
        iconSide="right"
      >
        {t('actions.next')}
      </Button>
    )}
  </div>
);
