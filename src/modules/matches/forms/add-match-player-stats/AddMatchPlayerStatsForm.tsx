import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { positionOptions } from '../../../../constants';
import { TApolloError } from '../../../../types/apollo';
import { getIntegers } from '../../../../utils/helpers';
import AddMatchPlayerStatsSchema, { AddMatchPlayerStatsFormValues } from './validation';

interface Props {
  onSubmit: (data: AddMatchPlayerStatsFormValues) => void;
  defaultValues: AddMatchPlayerStatsFormValues;
  goalOptions: ISelectOptions[];
  concededOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function AddMatchPlayerStatsForm({
  onSubmit,
  defaultValues,
  goalOptions,
  concededOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control, watch } = useForm<AddMatchPlayerStatsFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayerStatsSchema),
  });

  const goalsScored = watch('goals');
  const goalsConceded = watch('conceded') as number;

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ text: 'Add' }}
      loading={loading}
      error={error}
    >
      <ControlledSwitchInput control={control} name="isStarter" label="Is starter?" />
      <ControlledSelectInput
        control={control}
        name="matchPosition"
        label="Position"
        options={positionOptions}
      />
      <ControlledSelectInput control={control} name="goals" label="Goals" options={goalOptions} />
      <ControlledSelectInput
        control={control}
        name="pensScored"
        label="Pens Scored"
        options={goalOptions}
        disabled={+goalsScored === 0}
      />
      <ControlledSelectInput
        control={control}
        name="assists"
        label="Assists"
        options={goalOptions}
      />
      <ControlledSelectInput
        control={control}
        name="ownGoals"
        label="Own Goals"
        options={concededOptions}
      />
      <ControlledSelectInput
        control={control}
        name="pensMissed"
        label="Pens Missed"
        options={getIntegers(10)}
      />
      <ControlledSelectInput
        control={control}
        name="pensSaved"
        label="Pens Saved"
        options={getIntegers(10)}
      />
      <ControlledSelectInput
        control={control}
        name="conceded"
        label="Conceded"
        options={concededOptions}
      />
      <ControlledSelectInput
        control={control}
        name="yellowCards"
        label="Yellow Cards"
        options={getIntegers(2, 0)}
      />
      <ControlledSwitchInput control={control} name="mvp" label="Is MVP?" />
      <ControlledSwitchInput control={control} name="redCard" label="Red Card?" />
      <ControlledSwitchInput
        control={control}
        name="cleanSheet"
        label="Clean Sheet?"
        disabled={+goalsConceded !== 0}
      />
    </FormContainer>
  );
}
