import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSelectInput,
  ControlledSwitchInput,
} from '../../../../components';
import { useNationality } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { requiredFields, TeamDetailsSchema, type TeamFormData } from './schema';

interface Props {
  onSubmit: (data: TeamFormData) => void;
  defaultValues: TeamFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function AddTeamForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { t } = useTranslation('team');
  const { nationalityOptions } = useNationality();
  const {
    handleSubmit,
    control,
    formState: { isValid, isDirty },
    reset,
  } = useForm<TeamFormData>({
    defaultValues,
    resolver: zodResolver(TeamDetailsSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ disabled: !isDirty || !isValid }}
      onReset={() => reset(defaultValues)}
      loading={loading}
      error={error}
      formSummary={t('FORM.SUMMARY.ADD')}
    >
      <ControlledTextInput
        control={control}
        name="teamName"
        label={t('FORM.LABELS.TEAM_NAME')}
        required={requiredFields.teamName}
      />
      <ControlledTextInput
        control={control}
        name="location"
        label={t('FORM.LABELS.CITY')}
        required={requiredFields.location}
      />
      <ControlledSelectInput
        control={control}
        name="country"
        label={t('FORM.LABELS.COUNTRY')}
        options={nationalityOptions}
        required={requiredFields.country}
      />
      <ControlledSwitchInput name="isActive" label={t('FORM.LABELS.IS_ACTIVE')} control={control} />
    </FormContainer>
  );
}
