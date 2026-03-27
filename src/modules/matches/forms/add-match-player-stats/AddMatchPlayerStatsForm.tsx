import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import {
  FormContainer,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { positionOptions } from '../../../../constants';
import { TApolloError } from '../../../../types/apollo';
import { getNumberOptions } from '../../../../utils';
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
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<AddMatchPlayerStatsFormValues>({
    defaultValues,
    resolver: zodResolver(AddMatchPlayerStatsSchema),
  });

  const goalsScored = useWatch({ control, name: 'goals' });
  const goalsConceded = useWatch({ control, name: 'conceded' });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ text: 'Add', disabled: !isValid || !isDirty, confirm: { show: false } }}
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
        options={getNumberOptions(10)}
      />
      <ControlledSelectInput
        control={control}
        name="pensSaved"
        label="Pens Saved"
        options={getNumberOptions(10)}
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
        options={getNumberOptions(2, 0)}
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
