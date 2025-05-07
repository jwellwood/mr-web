import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { IForgotPasswordForm } from '../types';

interface Props {
  defaultValues: IForgotPasswordForm;
  onSubmit: (data: IForgotPasswordForm) => void;
}

const ForgotPasswordForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
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
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={!email.length}>
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
        errors={errors.email}
      />
    </FormContainer>
  );
};

export default ForgotPasswordForm;
