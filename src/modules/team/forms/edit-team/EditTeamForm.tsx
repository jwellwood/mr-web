import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import { surfaceOptions } from '../../constants';
import {
  FormContainer,
  ControlledTextInput,
  ControlledDateInput,
  ControlledSelectInput,
  ControlledColorInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../../components';
import { EditTeamSchema, type EditTeamFormData } from './validation';

interface Props {
  onSubmit: (data: EditTeamFormData) => void;
  defaultValues: EditTeamFormData;
  countryOptions: ISelectOptions[];
  loading: boolean;
  error?: ApolloError;
}

export default function EditTeamForm({
  onSubmit,
  defaultValues,
  countryOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control } = useForm<EditTeamFormData>({
    defaultValues,
    resolver: zodResolver(EditTeamSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledSwitchInput name="isActive" label="Is currently active" control={control} />
      <ControlledTextInput control={control} name="teamName" label="Team Name" />
      <ControlledDateInput control={control} name="yearFounded" label="Year Founded" view="year" />
      <ControlledTextInput control={control} name="location" label="City" />
      <ControlledSelectInput
        control={control}
        name="country"
        label="Country"
        options={countryOptions}
      />
      <ControlledTextInput control={control} name="stadiumName" label="Stadium Name" />
      <ControlledTextInput
        control={control}
        name="stadiumLocation"
        label="Stadium Location"
        multiline
      />
      <ControlledSelectInput
        control={control}
        options={surfaceOptions}
        name="stadiumSurface"
        label="Stadium Surface"
      />
      <ControlledTextInput control={control} name="stadiumCapacity" label="Capacity" />
      <ControlledColorInput control={control} name="homeShirt" label="Home Shirt" />
      <ControlledColorInput control={control} name="homeShorts" label="Home Shorts" />
      <ControlledColorInput control={control} name="homeSocks" label="Home Socks" />
      <ControlledColorInput control={control} name="awayShirt" label="Away Shirt" />
      <ControlledColorInput control={control} name="awayShorts" label="Away Shorts" />
      <ControlledColorInput control={control} name="awaySocks" label="Away Socks" />
      <ControlledColorInput control={control} name="kitsBackground" label="Kits Background" />
    </FormContainer>
  );
}
