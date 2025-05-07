import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContainer } from 'components/containers';
import { CenteredGrid, GridItem } from 'components/grids';
import ControlledTextInput from 'components/inputs/ControlledTextInput';
import { IPlayer } from 'types';

interface Props {
  onSubmit: (data: Partial<IPlayer>) => void;
  defaultValues: Partial<IPlayer>;
  playerName: string;
}

const DeletePlayerForm: React.FC<Props> = ({
  onSubmit,
  defaultValues,
  playerName,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<Partial<IPlayer>>({
    defaultValues,
  });

  const name = watch('name');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      disabled={name !== playerName}
    >
      <CenteredGrid dir="row">
        <GridItem xs={12}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Name"
            errors={errors.name}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
};

export default DeletePlayerForm;
