import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { getNumberOptions } from '../../../utils';
import { getCompetitionTypeOptions } from '../helpers/getCompetitionTypeOptions';
import type { CompetitionFormData } from './schema';
import { requiredFields, CompetitionSchema } from './schema';

interface Props {
  onSubmit: (data: CompetitionFormData) => void;
  defaultValues: CompetitionFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function CompetitionForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { t } = useTranslation('competitions');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<CompetitionFormData>({
    defaultValues,
    resolver: zodResolver(CompetitionSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isDirty || !isValid }}
      loading={loading}
      error={error}
      formSummary={t('FORM.SUMMARY')}
    >
      <ControlledTextInput
        control={control}
        name="name"
        label={t('FORM.LABELS.NAME')}
        required={requiredFields.name}
      />
      <ControlledSelectInput
        control={control}
        name="competitionType"
        label={t('FORM.LABELS.TYPE')}
        options={getCompetitionTypeOptions(t)}
        helperText={t('FORM.HELPERS.TYPE')}
        required={requiredFields.competitionType}
      />
      <ControlledSelectInput
        control={control}
        name="playersPerTeam"
        label={t('FORM.LABELS.PLAYERS_PER_TEAM')}
        options={getNumberOptions(15, 0)}
        required={requiredFields.playersPerTeam}
      />
      <ControlledSelectInput
        control={control}
        name="matchMinutes"
        label={t('FORM.LABELS.MATCH_LENGTH')}
        options={getNumberOptions(120, 0, 5)}
        required={requiredFields.matchMinutes}
      />
      <ControlledSwitchInput control={control} name="isActive" label={t('FORM.LABELS.ACTIVE')} />
    </FormContainer>
  );
}
