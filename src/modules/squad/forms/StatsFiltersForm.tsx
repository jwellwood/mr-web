import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  CustomButton,
  FormContainer,
  FormModal,
  ControlledSelectInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../components';
import { TFilters } from '../context/SquadStatsFiltersContext';
import StatsFiltersDisplay from './StatsFiltersDisplay';

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
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<TFilters>({ defaultValues });

  const resetForm = () => {
    reset();
    onReset();
  };

  const submitHandler = (values: { seasons: string; competitions: string }) => {
    onSubmit(values);
    setOpen(false);
  };

  return (
    <>
      <span onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        <StatsFiltersDisplay
          seasonOptions={seasonOptions}
          competitionOptions={competitionOptions}
        />
      </span>
      <FormModal title="Filters" open={open} onClose={() => setOpen(false)}>
        <FormContainer
          onSubmit={handleSubmit(submitHandler)}
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
    </>
  );
}
