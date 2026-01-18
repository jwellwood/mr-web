import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { TFilters } from '../../context';
import { ISelectOptions } from '../../../../components/inputs/SelectInput';
import FormModal from '../../../../components/modals/FormModal';

import { CustomButton, FormContainer } from '../../../../components';
import ControlledSelectInput from '../../../../components/inputs/ControlledSelectInput';
import StatsFiltersDisplay from '../../components/StatsFiltersDisplay';

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
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TFilters>({ defaultValues });

  const resetForm = () => {
    reset();
    onReset();
  };

  return (
    <FormModal
      title="Filters"
      buttonElement={
        <StatsFiltersDisplay
          seasonOptions={seasonOptions}
          competitionOptions={competitionOptions}
        />
      }
      closeForm={() => true}
    >
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        nonAbsoluteSubmit
        submitText="Apply"
        resetBtn={
          <CustomButton onClick={resetForm} color="error">
            Reset
          </CustomButton>
        }
      >
        <Stack spacing={2} sx={{ width: '300px', marginTop: '8px' }}>
          <ControlledSelectInput
            name="seasons"
            options={seasonOptions}
            label={'Season'}
            errors={errors.seasons ? [errors.seasons] : []}
            control={control}
          />
          <ControlledSelectInput
            name="competitions"
            options={competitionOptions}
            label={'Competitions'}
            errors={errors.competitions ? [errors.competitions] : []}
            control={control}
          />
        </Stack>
      </FormContainer>
    </FormModal>
  );
}
