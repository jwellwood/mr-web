import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer } from '../../../../../components/forms';
import {
  ControlledSwitchInput,
  ControlledSelectInput,
  type ISelectOptions,
} from '../../../../../components/inputs';
import { FormModal } from '../../../../../components/modals';
import { TMatchStatsFilters } from '../../../context';
import MatchStatsFiltersDisplay from './MatchStatsFiltersDisplay';

interface Props {
  onSubmit: (values: TMatchStatsFilters) => void;
  onReset: () => void;
  defaultValues: TMatchStatsFilters;
  competitionOptions: ISelectOptions[];
}

export default function MatchStatsFiltersForm({
  onSubmit,
  onReset,
  defaultValues,
  competitionOptions,
}: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('matches');
  const { handleSubmit, control, reset } = useForm<TMatchStatsFilters>({ defaultValues });
  const resetForm = () => {
    reset();
    onReset();
  };

  const submitHandler = (values: TMatchStatsFilters) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <MatchStatsFiltersDisplay competitionOptions={competitionOptions} />
      </span>
      <FormModal title={t('FILTERS.TITLE')} open={open} onClose={() => setOpen(false)}>
        <FormContainer
          loading={false}
          onSubmit={handleSubmit(submitHandler)}
          submitBtn={{ text: t('FORM.APPLY'), confirm: { show: false } }}
          onReset={resetForm}
        >
          <ControlledSelectInput
            name="competition"
            options={competitionOptions}
            label={t('FILTERS.COMPETITIONS')}
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
