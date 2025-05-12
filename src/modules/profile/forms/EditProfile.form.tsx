import React from 'react';
import { useForm } from 'react-hook-form';
import { IEditProfileForm } from '../types';
import { useNationality } from '../../../hooks';
import { FormContainer } from '../../../components/containers';
import { CenteredGrid } from '../../../components/grids';
import ControlledTextInput from '../../../components/inputs/ControlledTextInput.tsx';
import ControlledDateInput from '../../../components/inputs/ControlledDateInput.tsx';
import ControlledSelectInput from '../../../components/inputs/ControlledSelectInput.tsx';

interface Props {
  onSubmit: (event: IEditProfileForm) => Promise<void> | void;
  defaultValues: IEditProfileForm;
}
const EditProfileForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues,
  });

  const { nationalityOptions } = useNationality();

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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
};

export default EditProfileForm;
