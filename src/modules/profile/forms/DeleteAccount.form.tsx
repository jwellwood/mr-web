import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import { CenteredGrid } from 'components/grids';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { IDeleteAccountForm } from '../types';

interface Props {
  onSubmit: (data: IDeleteAccountForm) => void;
  defaultValues: IDeleteAccountForm;
  username: string;
}
const DeleteAccountForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  username,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const candidateName = watch('username');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      disabled={candidateName !== username}
    >
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="username"
          rules={{
            required: true,
            minLength: 2,
            maxLength: 30,
          }}
          label="Username"
          errors={errors.username}
        />
      </CenteredGrid>
    </FormContainer>
  );
};

export default DeleteAccountForm;
