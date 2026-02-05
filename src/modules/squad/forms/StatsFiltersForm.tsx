import { useForm } from 'react-hook-form';

import {
  CustomButton,
  FormContainer,
  FormModal,
  ControlledSelectInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../components';
import StatsFiltersDisplay from './StatsFiltersDisplay';
import { TFilters } from '../context/SquadStatsFiltersContext';

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
  const { handleSubmit, control, reset } = useForm<TFilters>({ defaultValues });

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
        loading={false}
        submitBtn={{ text: 'Apply' }}
        resetBtn={
          <CustomButton onClick={resetForm} color="error">
            Reset
          </CustomButton>
        }
      >
        <ControlledSelectInput
          name="seasons"
          options={seasonOptions}
          label={'Season'}
          control={control}
        />
        <ControlledSelectInput
          name="competitions"
          options={competitionOptions}
          label={'Competitions'}
          control={control}
        />

        <ControlledSwitchInput name="showAverages" label="Show Averages" control={control} />
      </FormContainer>
    </FormModal>
  );
}
