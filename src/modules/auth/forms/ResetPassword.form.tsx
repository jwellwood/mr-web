import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { CustomTypography } from '../../../components/typography';
import { IResetPasswordForm } from '../types';

interface Props {
  onSubmit: (data: IResetPasswordForm) => void;
  defaultValues: IResetPasswordForm;
}
const ResetPasswordForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const passwordInput = watch('password');
  const confirmPasswordInput = watch('confirmPassword');
  const isMatch =
    passwordInput.length > 1 && passwordInput === confirmPasswordInput;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={!isMatch}>
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="password"
          rules={{ required: true }}
          label="New Password"
          errors={errors.password ? [errors.password] : []}
          isPassword={true}
        />
        <ControlledTextInput
          control={control}
          name="confirmPassword"
          rules={{ required: true }}
          isPassword={true}
          label="Confirm New Password"
          errors={null}
        />
      </CenteredGrid>
      {!isMatch && confirmPasswordInput.length > 2 && (
        <CustomTypography bold color="warning">
          The new passwords do not match!
        </CustomTypography>
      )}
    </FormContainer>
  );
};

export default ResetPasswordForm;
