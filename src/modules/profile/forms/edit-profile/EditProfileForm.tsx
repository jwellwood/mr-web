import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledDateInput,
  ControlledSelectInput,
} from '../../../../components';
import { useNationality } from '../../../../hooks';
import { TApolloError } from '../../../../types/apollo';
import { EditProfileSchema, type EditProfileFormData } from './schema';

interface Props {
  onSubmit: (event: EditProfileFormData) => Promise<void> | void;
  defaultValues: EditProfileFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function EditProfileForm({ onSubmit, defaultValues, loading, error }: Props) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<EditProfileFormData>({
    defaultValues: defaultValues,
    resolver: zodResolver(EditProfileSchema),
    mode: 'onChange',
  });
  const { t } = useTranslation('profile');
  const { nationalityOptions } = useNationality();

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      error={error}
      submitBtn={{ disabled: !isDirty || !isValid }}
      onReset={() => reset(defaultValues)}
    >
      <ControlledTextInput control={control} name="username" label={t('FORM.LABELS.USERNAME')} />
      <ControlledTextInput control={control} name="email" label={t('FORM.LABELS.EMAIL_ADDRESS')} />
      <ControlledDateInput
        control={control}
        name="dateOfBirth"
        label={t('FORM.LABELS.DATE_OF_BIRTH')}
      />
      <ControlledSelectInput
        control={control}
        name="nationality"
        label={t('FORM.LABELS.NATIONALITY')}
        options={nationalityOptions}
      />
    </FormContainer>
  );
}
