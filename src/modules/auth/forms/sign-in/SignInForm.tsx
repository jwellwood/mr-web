import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { SignInSchema, type SignInFormData } from './validation';

interface Props {
  defaultValues: SignInFormData;
  onSubmit: (data: SignInFormData) => void;
  loading: boolean;
}

export default function SignInForm({ defaultValues, onSubmit, loading }: Props) {
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
      <ControlledTextInput control={control} name="email" label="Email Address" />
      <ControlledTextInput control={control} name="password" label="Password" isPassword={true} />
    </FormContainer>
  );
}
