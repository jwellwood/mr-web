import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import {
  CustomButton,
  FormContainer,
  FormModal,
  ControlledSwitchInput,
  ISelectOptions,
  ControlledSelectInput,
} from '../../../../../components';
import MatchStatsFiltersDisplay from './MatchStatsFiltersDisplay';
import { TMatchStatsFilters } from '../../../context';

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
  const { handleSubmit, control, reset } = useForm<TMatchStatsFilters>({ defaultValues });
  const resetForm = () => {
    reset();
    onReset();
  };

  return (
    <FormModal
      title="Filters"
      buttonElement={<MatchStatsFiltersDisplay competitionOptions={competitionOptions} />}
      closeForm={() => true}
    >
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
        </Stack>
      </FormContainer>
    </FormModal>
  );
}
