import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from '../../../components/containers';
import CustomDivider from '../../../components/dividers/CustomDivider';
import { CenteredGrid } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { ISignInForm } from '../types';
import { AUTH } from '../../../router/paths.ts';
import AuthorizationLinks from '../components/AuthorizationLinks.tsx';
import { IListItem } from '../../../types/index.ts';

interface Props {
  defaultValues: ISignInForm;
  onSubmit: (data: ISignInForm) => void;
}

const SignInForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<ISignInForm>({
    defaultValues,
  });

  const email = watch('email');
  const password = watch('password');

  const links: IListItem[] = [
    {
      label: "Don't have an account yet?",
      value: 'Sign up here',
      link: AUTH.SIGN_UP,
    },
    {
      label: 'Forgotten you password?',
      value: 'Reset here',
      link: AUTH.FORGOT,
    },
  ];

  return (
    <>
      <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={!email.length || !password.length}>
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
      <CustomDivider hasMargin />
      <AuthorizationLinks links={links} />
    </>
  );
};

export default SignInForm;
