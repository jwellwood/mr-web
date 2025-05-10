import React from 'react';
import { useForm } from 'react-hook-form';
import { CustomButton } from '../../../components/buttons';
import { FormContainer } from '../../../components/containers';
import { CustomSwitch } from '../../../components/inputs';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import LinksList from '../../../components/lists/LinksList';
import { CustomTypography } from '../../../components/typography';
import { AUTH } from 'router/paths';
import { IListItem } from '../../../types';import { ISignUpForm } from '../types';

interface Props {
  onSubmit: (data: ISignUpForm) => void;
  defaultValues: ISignUpForm;
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
  } = useForm<ISignUpForm>({
    defaultValues,
  });

  const email = watch('email');
  const username = watch('username');
  const password = watch('password');

  const disabled =
    !acceptTerms || !email.length || !username.length || !password.length;

  const links: IListItem[] = [
    {
      label: 'Already have an account?',
      value: <CustomButton>Sign in here</CustomButton>,
      link: AUTH.SIGN_IN,
    },
  ];
  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={disabled}>
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

        <div style={{ marginLeft: '10px' }}>
          <CustomSwitch
            name="acceptTerms"
            checked={acceptTerms}
            onCheck={onAcceptTermsToggle}
            label={
              <>
                <CustomTypography color="label" size="xs">
                  I accept the terms of use
                </CustomTypography>{' '}
              </>
            }
            placement="end"
          />
        </div>
      </FormContainer>
      <LinksList links={links} />
    </>
  );
};

export default SignUpForm;
