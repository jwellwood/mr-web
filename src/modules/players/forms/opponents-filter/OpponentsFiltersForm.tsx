import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomButton,
  FormContainer,
  FormModal,
  ControlledSwitchInput,
} from '../../../../components';
import { TPlayerOpponentFilters } from '../../context';
import OpponentFiltersDisplay from './OpponentFiltersDisplay';

interface Props {
  onSubmit: (values: TPlayerOpponentFilters) => void;
  onReset: () => void;
  defaultValues: TPlayerOpponentFilters;
}

export default function OpponentsFiltersForm({ onSubmit, onReset, defaultValues }: Props) {
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
          <ControlledSwitchInput
            name="showAllOpponents"
            label="Show all opponents"
            control={control}
          />
          <ControlledSwitchInput name="showAverages" label="Show averages" control={control} />
        </FormContainer>
      </FormModal>
    </>
  );
}
