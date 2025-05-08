import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { ITeamRoles } from 'types';

interface Props {
  onSubmit: (data: ITeamRoles) => void;
  defaultValues: Partial<ITeamRoles>;
}

const UpdateTeamRolesForm: React.FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ITeamRoles>({
    defaultValues,
  });
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Name"
            errors={errors.name ? [errors.name] : []}
            rules={{ required: true, minLength: 2, maxLength: 50 }}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="role"
            label="Role"
            errors={errors.role ? [errors.role] : []}
          />
        </GridItem>
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="contact"
            label="Contact"
            errors={errors.contact ? [errors.contact] : []}
            rules={{ maxLength: 99 }}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default UpdateTeamRolesForm;
