import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledTextInput } from '../../../../components';
import type { ChangePasswordFormData } from './schema';
import { ChangePasswordSchema } from './schema';

interface Props {
  onSubmit: (data: ChangePasswordFormData) => void;
  defaultValues: ChangePasswordFormData;
  loading: boolean;
}

export default function EditPasswordForm({ onSubmit, defaultValues, loading }: Props) {
  const { t } = useTranslation('profile');
  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isValid },
    clearErrors,
  } = useForm<ChangePasswordFormData>({
    defaultValues,
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      submitBtn={{ disabled: !isDirty || !isValid, confirm: { show: false } }}
      onReset={() => {
        reset(defaultValues);
        clearErrors();
      }}
    >
      <ControlledTextInput
        control={control}
        name="password"
        label={t('LABELS.CURRENT_PASSWORD')}
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="newPassword"
        label={t('LABELS.NEW_PASSWORD')}
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="confirmPassword"
        label={t('LABELS.CONFIRM_NEW_PASSWORD')}
        isPassword={true}
      />
    </FormContainer>
  );
}
