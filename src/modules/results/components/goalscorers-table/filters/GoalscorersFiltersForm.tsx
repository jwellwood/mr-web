import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledSelectInput, FormContainer, ISelectOptions } from '../../../../../components';
import { FormModal } from '../../../../../components/modals';
import { TGoalscorersFilters } from '../../../context';
import GoalscorersFiltersDisplay from './GoalscorersFiltersDisplay';

interface Props {
  onSubmit: (values: TGoalscorersFilters) => void;
  onReset: () => void;
  defaultValues: TGoalscorersFilters;
  competitionOptions: ISelectOptions[];
}

export default function GoalscorersFiltersForm({
  onSubmit,
  onReset,
  defaultValues,
  competitionOptions,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('results');
  const { handleSubmit, control, reset } = useForm<TGoalscorersFilters>({ defaultValues });

  const resetForm = () => {
    reset();
    onReset();
  };

  const submitHandler = (values: TGoalscorersFilters) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <GoalscorersFiltersDisplay competitionOptions={competitionOptions} />
      </span>
      <FormModal title={t('FILTERS.TITLE')} open={open} onClose={() => setOpen(false)}>
        <FormContainer
          loading={false}
          onSubmit={handleSubmit(submitHandler)}
          submitBtn={{ text: t('FORM.BUTTONS.APPLY'), confirm: { show: false } }}
          onReset={resetForm}
        >
          <ControlledSelectInput
            name="competitionId"
            options={competitionOptions}
            label={t('FILTERS.COMPETITIONS')}
            control={control}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
