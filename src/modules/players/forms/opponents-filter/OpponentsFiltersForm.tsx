import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledSwitchInput } from '../../../../components';
import { FormModal } from '../../../../components/modals';
import { TPlayerOpponentFilters } from '../../context';
import OpponentFiltersDisplay from './OpponentFiltersDisplay';

interface Props {
  onSubmit: (values: TPlayerOpponentFilters) => void;
  onReset: () => void;
  defaultValues: TPlayerOpponentFilters;
}

export default function OpponentsFiltersForm({ onSubmit, onReset, defaultValues }: Props) {
  const { t } = useTranslation('players');
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<TPlayerOpponentFilters>({ defaultValues });

  const resetForm = () => {
    reset();
    onReset();
  };

  const submitHandler = (values: TPlayerOpponentFilters) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <OpponentFiltersDisplay />
      </span>
      <FormModal title={t('FILTERS.TITLE')} open={open} onClose={() => setOpen(false)}>
        <FormContainer
          loading={false}
          onSubmit={handleSubmit(submitHandler)}
          submitBtn={{ text: t('FILTERS.APPLY'), confirm: { show: false } }}
          onReset={resetForm}
        >
          <ControlledSwitchInput
            name="showAllOpponents"
            label={t('FILTERS.SHOW_ALL_OPPONENTS')}
            control={control}
          />
          <ControlledSwitchInput
            name="showAverages"
            label={t('FILTERS.SHOW_AVERAGES')}
            control={control}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
