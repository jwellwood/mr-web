import { useForm } from 'react-hook-form';

import { useNationality } from '../../../hooks/index.ts';
import { FormContainer } from '../../../components/containers/index.ts';
import { CenteredGrid } from '../../../components/grids/index.ts';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput.tsx';
import ControlledDateInput from '../../../components/inputs/ControlledDateInput.tsx';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput.tsx';
import { IEditProfileInput } from '../types.ts';

interface Props {
  onSubmit: (event: IEditProfileInput) => Promise<void> | void;
  defaultValues: IEditProfileInput;
  loading: boolean;
}

export default function EditProfileForm({ onSubmit, defaultValues, loading }: Props) {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
  });

  const { nationalityOptions } = useNationality();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading}>
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="username"
          rules={{ required: true, minLength: 2, maxLength: 30 }}
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
        <ControlledDateInput
          control={control}
          name="dateOfBirth"
          label="Date of Birth"
          view="year"
          errors={errors.dateOfBirth ? [errors.dateOfBirth] : []}
        />
        <ControlledSelectInput
          control={control}
          name="nationality"
          label="Nationality"
          errors={errors.nationality ? [errors.nationality] : []}
          options={nationalityOptions}
        />
      </CenteredGrid>
    </FormContainer>
  );
}
