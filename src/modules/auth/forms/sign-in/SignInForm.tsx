import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { SignInFormData, SignInSchema } from './schema';

interface Props {
  defaultValues: SignInFormData;
  onSubmit: (data: SignInFormData) => void;
  loading: boolean;
}

export default function SignInForm({ defaultValues, onSubmit, loading }: Props) {
  const { t } = useTranslation('auth');
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<SignInFormData>({
    defaultValues,
    resolver: zodResolver(SignInSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      minWidth={100}
      submitBtn={{ confirm: { show: false }, disabled: !isValid }}
    >
      <ControlledTextInput control={control} name="email" label={t('FORM.LABELS.EMAIL')} />
      <ControlledTextInput
        control={control}
        name="password"
        label={t('FORM.LABELS.PASSWORD')}
        isPassword={true}
      />
    </FormContainer>
  );
}
