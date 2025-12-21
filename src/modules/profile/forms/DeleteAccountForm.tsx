import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../components/containers';
import { CenteredGrid } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput';
import { IDeleteAccountInput } from '../types';

interface Props {
  onSubmit: (data: IDeleteAccountInput) => void;
  defaultValues: IDeleteAccountInput;
  username: string;
  loading: boolean;
}

export default function DeleteAccountForm({ onSubmit, defaultValues, username, loading }: Props) {
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
      loading={loading}
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
          errors={errors.username ? [errors.username] : []}
        />
      </CenteredGrid>
    </FormContainer>
  );
}
