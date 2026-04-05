import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledSelectInput,
  ControlledDateInput,
  ControlledSwitchInput,
} from '../../../../components';
import { useNationality } from '../../../../hooks';
import { TeamDetailsSchema, type TeamFormData } from './schema';

interface Props {
  onSubmit: (data: TeamFormData) => void;
  defaultValues: TeamFormData;
  loading: boolean;
}

export default function AddTeamForm({ onSubmit, defaultValues, loading }: Props) {
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
    >
      <ControlledTextInput control={control} name="teamName" label={t('FORM.LABELS.TEAM_NAME')} />
      <ControlledDateInput
        control={control}
        name="yearFounded"
        label={t('FORM.LABELS.YEAR_FOUNDED')}
        view="year"
      />
      <ControlledTextInput control={control} name="location" label="City" />
      <ControlledSelectInput
        control={control}
        name="country"
        label={t('FORM.LABELS.COUNTRY')}
        options={nationalityOptions}
      />
      <ControlledSwitchInput name="isActive" label={t('FORM.LABELS.IS_ACTIVE')} control={control} />
    </FormContainer>
  );
}
