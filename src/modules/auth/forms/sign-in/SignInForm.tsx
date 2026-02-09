import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { CenteredGrid } from '../../../../components/grids';
import { SignInSchema, type SignInFormData } from './validation';

interface Props {
  defaultValues: SignInFormData;
  onSubmit: (data: SignInFormData) => void;
  loading: boolean;
  error?: ApolloError;
}

export default function SignInForm({ defaultValues, onSubmit, loading, error }: Props) {
  const { handleSubmit, control } = useForm<SignInFormData>({
    defaultValues,
    resolver: zodResolver(SignInSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <CenteredGrid dir="row">
        <ControlledTextInput control={control} name="email" label="Email Address" />
        <ControlledTextInput control={control} name="password" label="Password" isPassword={true} />
      </CenteredGrid>
    </FormContainer>
  );
}
