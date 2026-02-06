import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  CustomButton,
  FormContainer,
  FormModal,
  ControlledSwitchInput,
} from '../../../../../components';
import OpponentFiltersDisplay from './OpponentFiltersDisplay';
import { TMatchOpponentFilters } from '../../../context';

interface Props {
  onSubmit: (values: TMatchOpponentFilters) => void;
  onReset: () => void;
  defaultValues: TMatchOpponentFilters;
}

export default function OpponentsFiltersForm({ onSubmit, onReset, defaultValues }: Props) {
  const { handleSubmit, control, reset } = useForm<TMatchOpponentFilters>({ defaultValues });
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
          <ControlledSwitchInput name="showAllTeams" label="Show all teams" control={control} />
          <ControlledSwitchInput
            name="includeForfeits"
            label="Include forfeits"
            control={control}
          />
        </Stack>
      </FormContainer>
    </FormModal>
  );
}
