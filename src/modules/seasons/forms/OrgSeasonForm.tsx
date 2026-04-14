import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledDateInput,
  ControlledTextInput,
  ControlledSwitchInput,
  ControlledMultiSelectInput,
  ISelectOptions,
} from '../../../components';
import { TApolloError } from '../../../types/apollo';
import IncludedTeams from '../components/IncludedOptions';
import { OrgSeasonSchema, type OrgSeasonFormData } from './schema';

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

  const { t } = useTranslation('seasons');
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
      <ControlledDateInput
        control={control}
        name="yearStarted"
        label={t('FORM.LABELS.YEAR_STARTED')}
        view="year"
      />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label={t('FORM.LABELS.YEAR_ENDED')}
        view="year"
        disableFuture={false}
      />
      <ControlledSwitchInput
        control={control}
        name="isCurrent"
        label={t('FORM.LABELS.IS_CURRENT')}
      />
      <ControlledMultiSelectInput
        control={control}
        name="teamIds"
        label={t('FORM.LABELS.TEAMS')}
        options={teamOptions}
      />
      <IncludedTeams options={selectedTeams} />
      <ControlledMultiSelectInput
        control={control}
        name="competitionIds"
        label={t('FORM.LABELS.COMPETITIONS')}
        options={competitionOptions}
      />
      <IncludedTeams options={selectedCompetitions} />
      <ControlledTextInput
        multiline
        control={control}
        name="comment"
        label={t('FORM.LABELS.COMMENT')}
      />
    </FormContainer>
  );
}
