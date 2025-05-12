import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { CustomTypography } from '../../../components/typography';
import { IChangePasswordForm } from '../types';

interface Props {
  onSubmit: (data: IChangePasswordForm) => void;
  defaultValues: IChangePasswordForm;
}
const EditPasswordForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const newPasswordInput = watch('newPassword');
  const confirmPasswordInput = watch('confirmPassword');
  const isMatch = newPasswordInput.length > 1 && newPasswordInput === confirmPasswordInput;

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={!isMatch}>
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="password"
          label="Current Password"
          rules={{ required: true }}
          isPassword={true}
          errors={errors.password ? [errors.password] : []}
        />
        <ControlledTextInput
          control={control}
          name="newPassword"
          label="New Password"
          rules={{ required: true }}
          isPassword={true}
          errors={errors.newPassword ? [errors.newPassword] : []}
        />
        <ControlledTextInput
          control={control}
          name="confirmPassword"
          rules={{ required: true }}
          label="Confirm New Password"
          isPassword={true}
          errors={errors.confirmPassword ? [errors.confirmPassword] : []}
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

export default EditPasswordForm;
