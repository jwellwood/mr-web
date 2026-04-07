import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledSwitchInput } from '../../../../../components';
import { FormModal } from '../../../../../components/modals';
import { TMatchOpponentFilters } from '../../../context';
import OpponentFiltersDisplay from './OpponentFiltersDisplay';

interface Props {
  onSubmit: (values: TMatchOpponentFilters) => void;
  onReset: () => void;
  defaultValues: TMatchOpponentFilters;
}

export default function OpponentsFiltersForm({ onSubmit, onReset, defaultValues }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('matches');
  const { handleSubmit, control, reset } = useForm<TMatchOpponentFilters>({ defaultValues });
  const resetForm = () => {
    reset();
    onReset();
  };

  const submitHandler = (values: TMatchOpponentFilters) => {
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
          submitBtn={{ text: t('FORM.APPLY'), confirm: { show: false } }}
          onReset={resetForm}
        >
          <ControlledSwitchInput
            name="showAllTeams"
            label={t('FILTERS.SHOW_ALL_TEAMS')}
            control={control}
          />
          <ControlledSwitchInput
            name="includeForfeits"
            label={t('FILTERS.INCLUDE_FORFEITS')}
            control={control}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
