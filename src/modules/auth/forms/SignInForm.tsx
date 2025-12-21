import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../components/containers';
import { CenteredGrid } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { ISignInInput } from '../types';

interface Props {
  defaultValues: ISignInInput;
  onSubmit: (data: ISignInInput) => void;
}

export default function SignInForm({ defaultValues, onSubmit }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ISignInInput>({
    defaultValues,
  });

  const email = watch('email');
  const password = watch('password');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      disabled={!email.length || !password.length}
      nonAbsoluteSubmit
    >
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="email"
          rules={{
            required: true,
            minLength: 2,
            maxLength: 30,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          }}
          label="Email Address"
          errors={errors.email ? [errors.email] : []}
        />
        <ControlledTextInput
          control={control}
          name="password"
          label="Password"
          errors={errors.password ? [errors.password] : []}
          isPassword={true}
        />
      </CenteredGrid>
    </FormContainer>
  );
}
