import React from 'react';
import { useForm } from 'react-hook-form';
import { CustomButton } from 'components/buttons';
import { FormContainer } from 'components/containers';
import CustomDivider from 'components/dividers/CustomDivider';
import { CenteredGrid } from 'components/grids';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import LinksList from 'components/lists/LinksList';
import { AUTH } from 'router/paths';
import { IListItem } from 'types';
import { ISignInForm } from '../types';

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
      value: <CustomButton>Sign up here</CustomButton>,
      link: AUTH.SIGN_UP,
    },
    {
      label: 'Forgotten you password?',
      value: <CustomButton>Reset here</CustomButton>,
      link: AUTH.FORGOT,
    },
  ];

  return (
    <>
      <FormContainer
        onSubmit={handleSubmit(onSubmit)}
        disabled={!email.length || !password.length}
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
            errors={errors.email}
          />
          <ControlledTextInput
            control={control}
            name="password"
            label="Password"
            errors={errors.password}
            isPassword={true}
          />
        </CenteredGrid>
      </FormContainer>
      <CustomDivider hasMargin />
      <LinksList links={links} />
    </>
  );
};

export default SignInForm;
