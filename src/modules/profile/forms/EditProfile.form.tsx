import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import { CenteredGrid } from 'components/grids';
import ControlledDateInput from 'components/inputs/ControlledDateInput';
import ControlledSelectInput from 'components/inputs/ControlledSelectInput';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { useNationality } from 'hooks';
import { IEditProfileForm } from '../types';

interface Props {
  onSubmit: (data: any) => void;
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
          errors={errors.username}
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
          errors={errors.email}
        />
        <ControlledDateInput
          control={control}
          name="dateOfBirth"
          label="Date of Birth"
          view="year"
          errors={errors.dateOfBirth}
        />
        <ControlledSelectInput
          control={control}
          name="nationality"
          label="Nationality"
          errors={errors.nationality}
          options={nationalityOptions}
        />
      </CenteredGrid>
    </FormContainer>
  );
};

export default EditProfileForm;
