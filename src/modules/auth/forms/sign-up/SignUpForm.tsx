import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput, ControlledSwitchInput } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { SignUpSchema, type SignUpFormData } from './validation';

interface Props {
  onSubmit: (data: SignUpFormData) => void;
  defaultValues: SignUpFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function SignUpForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { handleSubmit, control } = useForm<SignUpFormData>({
    defaultValues,
    resolver: zodResolver(SignUpSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="username" label="Username" />
      <ControlledTextInput control={control} name="email" label="Email Address" />
      <ControlledTextInput control={control} name="password" isPassword={true} label="Password" />
      <ControlledSwitchInput
        control={control}
        name="acceptTerms"
        label="I accept the terms of use"
      />
    </FormContainer>
  );
}
