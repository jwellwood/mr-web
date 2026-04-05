import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { ForgotPasswordFormData, ForgotPasswordSchema } from './schema';

interface Props {
  defaultValues: ForgotPasswordFormData;
  onSubmit: (data: ForgotPasswordFormData) => void;
  loading: boolean;
  error?: TApolloError;
}

export default function ForgotPasswordForm({ defaultValues, onSubmit, loading, error }: Props) {
  const { t } = useTranslation('auth');
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordFormData>({
    defaultValues,
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      error={error}
      submitBtn={{ confirm: { show: false }, disabled: !isValid }}
      minWidth={100}
    >
      <ControlledTextInput control={control} name="email" label={t('FORM.LABELS.EMAIL')} />
    </FormContainer>
  );
}
