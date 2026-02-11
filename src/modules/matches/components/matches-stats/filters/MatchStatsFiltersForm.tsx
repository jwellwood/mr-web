import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomButton,
  FormContainer,
  ControlledSwitchInput,
  ISelectOptions,
  ControlledSelectInput,
} from '../../../../../components';
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
      <FormModal title="Filters" open={open} onClose={() => setOpen(false)}>
        <FormContainer
          loading={false}
          onSubmit={handleSubmit(submitHandler)}
          submitBtn={{ text: 'Apply' }}
          resetBtn={
            <CustomButton onClick={resetForm} color="error">
              Reset
            </CustomButton>
          }
        >
          <ControlledSelectInput
            name="competition"
            options={competitionOptions}
            label={'Competitions'}
            control={control}
          />
          <ControlledSwitchInput
            name="includeForfeits"
            label="Include forfeits"
            control={control}
          />
        </FormContainer>
      </FormModal>
    </>
  );
}
