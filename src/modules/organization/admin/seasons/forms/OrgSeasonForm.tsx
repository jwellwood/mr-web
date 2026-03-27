import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import {
  FormContainer,
  ControlledDateInput,
  ControlledTextInput,
  ControlledSwitchInput,
  ControlledMultiSelectInput,
  ISelectOptions,
} from '../../../../../components';
import { TApolloError } from '../../../../../types/apollo';
import IncludedTeams from '../components/IncludedOptions';
import { OrgSeasonSchema, type OrgSeasonFormData } from './validation';

interface Props {
  onSubmit: (formData: OrgSeasonFormData) => void;
  defaultValues: OrgSeasonFormData;
  teamOptions: ISelectOptions[];
  competitionOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function OrgSeasonForm({
  onSubmit,
  defaultValues,
  teamOptions,
  competitionOptions,
  loading,
  error,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<OrgSeasonFormData>({
    defaultValues,
    resolver: zodResolver(OrgSeasonSchema),
    mode: 'onChange',
  });

  const teamsSelected = useWatch({ control, name: 'teamIds' });
  const competitionSelected = useWatch({ control, name: 'competitionIds' });

  const selectedTeams = teamOptions.filter(option =>
    teamsSelected?.includes(option?.value as string)
  );

  const selectedCompetitions = competitionOptions.filter(option =>
    competitionSelected?.includes(option?.value as string)
  );

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isDirty || !isValid }}
      loading={loading}
      error={error}
    >
      <ControlledDateInput control={control} name="yearStarted" label="Year Started" view="year" />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label="Year Ended"
        view="year"
        disableFuture={false}
      />
      <ControlledSwitchInput control={control} name="isCurrent" label="Is current season?" />
      <ControlledMultiSelectInput
        control={control}
        name="teamIds"
        label="Teams in this season"
        options={teamOptions}
      />
      <IncludedTeams options={selectedTeams} />
      <ControlledMultiSelectInput
        control={control}
        name="competitionIds"
        label="Competitions in this season"
        options={competitionOptions}
      />
      <IncludedTeams options={selectedCompetitions} />
      <ControlledTextInput multiline control={control} name="comment" label="Comment" />
    </FormContainer>
  );
}
