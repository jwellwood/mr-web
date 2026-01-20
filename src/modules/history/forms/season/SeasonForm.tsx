import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import {
  FormContainer,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledTextInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { DeleteModal } from '../../../../components/modals';
import { getIntegers } from '../../../../utils/helpers';
import { SeasonSchema, type SeasonFormData } from './validation';

interface Props {
  onSubmit: (formData: SeasonFormData) => void;
  defaultValues: SeasonFormData;
  competitionOptions: ISelectOptions[];
  onDelete?: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function SeasonForm({
  onSubmit,
  defaultValues,
  competitionOptions,
  onDelete,
  loading,
  error,
}: Props) {
  const { handleSubmit, control, watch } = useForm<SeasonFormData>({
    defaultValues,
    resolver: zodResolver(SeasonSchema),
    mode: 'onChange',
  });

  const totalTeams = watch('totalFinalPositions');
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledDateInput control={control} name="yearStarted" label="Year Started" view="year" />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label="Year Ended"
        view="year"
        disableFuture={false}
      />
      <ControlledSelectInput
        control={control}
        name="division"
        label="Division"
        options={competitionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="totalFinalPositions"
        label="Number of Teams"
        options={getIntegers(50, 0)}
      />
      {totalTeams ? (
        <ControlledSelectInput
          control={control}
          name="leaguePosition"
          label="Final Position"
          options={getIntegers(totalTeams, 0)}
        />
      ) : null}
      <ControlledTextInput multiline control={control} name="comment" label="Comment" />
      {onDelete && <DeleteModal onDelete={onDelete} title="Season" loading={loading} />}
    </FormContainer>
  );
}
