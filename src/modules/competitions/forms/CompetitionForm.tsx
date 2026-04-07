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
import { CompetitionSchema } from './schema';

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
    >
      <ControlledTextInput control={control} name="name" label={t('FORM.NAME')} />
      <ControlledSelectInput
        control={control}
        name="competitionType"
        label={t('FORM.TYPE')}
        options={getCompetitionTypeOptions(t)}
      />
      <ControlledSelectInput
        control={control}
        name="playersPerTeam"
        label={t('FORM.PLAYERS_PER_TEAM')}
        options={getNumberOptions(15)}
      />
      <ControlledSelectInput
        control={control}
        name="matchMinutes"
        label={t('FORM.MATCH_LENGTH')}
        options={getNumberOptions(120, 5, 5)}
      />
      <ControlledSwitchInput control={control} name="isActive" label={t('FORM.ACTIVE')} />
    </FormContainer>
  );
}
