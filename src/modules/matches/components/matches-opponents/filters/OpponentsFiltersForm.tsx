import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledSwitchInput } from '../../../../../components';
import { CustomButton } from '../../../../../components/buttons';
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
          <ControlledSwitchInput name="showAllTeams" label="Show all teams" control={control} />
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
