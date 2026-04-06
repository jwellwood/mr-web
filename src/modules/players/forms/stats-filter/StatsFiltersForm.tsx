import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledSelectInput, type ISelectOptions } from '../../../../components';
import { FormModal } from '../../../../components/modals';
import { TFilters } from '../../context';
import StatsFiltersDisplay from './StatsFiltersDisplay';

interface Props {
  onSubmit: (values: { seasons: string; competitions: string }) => void;
  onReset: () => void;
  defaultValues: TFilters;
  seasonOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
}

export default function StatsFiltersForm({
  onSubmit,
  onReset,
  seasonOptions,
  competitionOptions,
  defaultValues,
}: Props) {
  const { t } = useTranslation('players');
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<TFilters>({ defaultValues });

  const resetForm = () => {
    reset();
    onReset();
  };

  const submitHandler = (values: { seasons: string; competitions: string }) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <StatsFiltersDisplay
          seasonOptions={seasonOptions}
          competitionOptions={competitionOptions}
        />
      </span>
      <FormModal title={t('FILTERS.TITLE')} open={open} onClose={() => setOpen(false)}>
        <FormContainer
          loading={false}
          onSubmit={handleSubmit(submitHandler)}
          submitBtn={{ text: t('FILTERS.APPLY'), confirm: { show: false } }}
          onReset={resetForm}
        >
          <ControlledSelectInput
            name="seasons"
            options={seasonOptions}
            label={t('FILTERS.LABELS.SEASON')}
            control={control}
          />
          <ControlledSelectInput
            name="competitions"
            options={competitionOptions}
            label={t('FILTERS.LABELS.COMPETITION')}
            control={control}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
