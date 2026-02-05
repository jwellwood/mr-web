import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import { TPlayerOpponentFilters } from '../../context';
import {
  CustomButton,
  FormContainer,
  FormModal,
  ControlledSwitchInput,
} from '../../../../components';
import OpponentFiltersDisplay from './OpponentFiltersDisplay';

interface Props {
  onSubmit: (values: TPlayerOpponentFilters) => void;
  onReset: () => void;
  defaultValues: TPlayerOpponentFilters;
}

export default function OpponentsFiltersForm({ onSubmit, onReset, defaultValues }: Props) {
  const { handleSubmit, control, reset } = useForm<TPlayerOpponentFilters>({ defaultValues });

  const resetForm = () => {
    reset();
    onReset();
  };

  return (
    <FormModal title="Filters" buttonElement={<OpponentFiltersDisplay />} closeForm={() => true}>
      <FormContainer
        loading={false}
        onSubmit={handleSubmit(onSubmit)}
        submitBtn={{ text: 'Apply' }}
        resetBtn={
          <CustomButton onClick={resetForm} color="error">
            Reset
          </CustomButton>
        }
      >
        <Stack spacing={2} sx={{ width: '300px', marginTop: '8px' }}>
          <ControlledSwitchInput
            name="showAllOpponents"
            label="Show all opponents"
            control={control}
          />
          <ControlledSwitchInput name="showAverages" label="Show averages" control={control} />
        </Stack>
      </FormContainer>
    </FormModal>
  );
}
