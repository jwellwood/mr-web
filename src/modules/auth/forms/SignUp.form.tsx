import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import { CustomSwitch } from '../../../components/inputs';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { CustomTypography } from '../../../components/typography';
import { ISignUpInput } from '../types';
import { CenteredGrid } from '../../../components/grids';

interface Props {
  onSubmit: (data: ISignUpInput) => void;
  defaultValues: ISignUpInput;
  acceptTerms?: boolean;
  onAcceptTermsToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignUpForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  acceptTerms,
  onAcceptTermsToggle,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ISignUpInput>({
    defaultValues,
  });

  const email = watch('email');
  const username = watch('username');
  const password = watch('password');

  const disabled = !acceptTerms || !email.length || !username.length || !password.length;

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={disabled} nonAbsoluteSubmit>
        <ControlledTextInput
          control={control}
          name="username"
          rules={{
            required: true,
            minLength: 2,
            maxLength: 30,
          }}
          label="Username"
          errors={errors.username ? [errors.username] : []}
        />
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
          isPassword={true}
          label="Password"
          errors={errors.password ? [errors.password] : []}
        />
      </FormContainer>
      <CenteredGrid>
        <CustomSwitch
          name="acceptTerms"
          checked={acceptTerms}
          onCheck={onAcceptTermsToggle}
          label={
            <>
              <CustomTypography color="label" size="xs">
                I accept the terms of use
              </CustomTypography>
            </>
          }
          placement="end"
        />
      </CenteredGrid>
    </>
  );
};

export default SignUpForm;
