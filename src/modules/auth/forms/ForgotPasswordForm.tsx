import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../components/containers';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { IForgotPasswordInput } from '../types';

interface Props {
  defaultValues: IForgotPasswordInput;
  onSubmit: (data: IForgotPasswordInput) => void;
  loading: boolean;
}

export default function ForgotPasswordForm({ defaultValues, onSubmit, loading }: Props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
  });

  const email = watch('email');

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={!email.length} loading={loading}>
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
    </FormContainer>
  );
}
