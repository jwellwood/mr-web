import React from 'react';
import { useForm } from 'react-hook-form';

import { IDeleteTeamForm } from '../types';
import {FormContainer} from "../../../components/containers";
import {CenteredGrid} from "../../../components/grids";
import ControlledTextInput from "../../../components/inputs/ControlledTextInput.tsx";

interface Props {
  onSubmit: (data: IDeleteTeamForm) => void;
  defaultValues?: IDeleteTeamForm;
  teamName: string;
}
const DeleteTeamForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  teamName,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    defaultValues,
  });

  const candidateName = watch('teamName');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      disabled={candidateName !== teamName}
    >
      <CenteredGrid dir="row">
        <ControlledTextInput
          control={control}
          name="teamName"
          rules={{ required: true }}
          label="Team Name"
          errors={errors.teamName ? [errors.teamName] : []}
        />
      </CenteredGrid>
    </FormContainer>
  );
};

export default DeleteTeamForm;
