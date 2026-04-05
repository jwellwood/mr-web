import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { ResetPasswordFormData, ResetPasswordSchema } from './schema';

interface Props {
  onSubmit: (data: ResetPasswordFormData) => void;
  defaultValues: ResetPasswordFormData;
  loading: boolean;
}

export default function ResetPasswordForm({ onSubmit, defaultValues, loading }: Props) {
  const { t } = useTranslation('auth');
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ResetPasswordFormData>({
    defaultValues,
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      submitBtn={{ confirm: { show: false }, disabled: !isValid }}
      minWidth={100}
    >
      <ControlledTextInput
        control={control}
        name="password"
        label={t('FORM.LABELS.NEW_PASSWORD')}
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="confirmPassword"
        isPassword={true}
        label={t('FORM.LABELS.CONFIRM_NEW_PASSWORD')}
      />
    </FormContainer>
  );
}
