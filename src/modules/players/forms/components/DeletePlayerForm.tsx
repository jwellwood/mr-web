import { useForm } from 'react-hook-form';

import { FormContainer } from '../../../../components/containers';
import { CenteredGrid, GridItem } from '../../../../components/grids';
import ControlledTextInput from '../../../../components/inputs/ControlledTextInput';
import { IPlayer } from '../../types';

interface Props {
  onSubmit: (data: Partial<IPlayer>) => void;
  defaultValues: Partial<IPlayer>;
  playerName: string;
}

export default function DeletePlayerForm({ onSubmit, defaultValues, playerName }: Props) {
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
    <FormContainer onSubmit={handleSubmit(onSubmit)} disabled={name !== playerName}>
      <CenteredGrid dir="row">
        <GridItem size={12}>
          <ControlledTextInput
            control={control}
            name="name"
            label="Name"
            errors={errors.name ? [errors.name] : []}
          />
        </GridItem>
      </CenteredGrid>
    </FormContainer>
  );
}
