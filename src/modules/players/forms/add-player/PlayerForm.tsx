import { ApolloError } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledDateInput,
  ControlledMultiSelectInput,
  ControlledSelectInput,
  ControlledTextInput,
  ControlledSwitchInput,
  type ISelectOptions,
} from '../../../../components';
import { positionOptions } from '../../../../constants';
import { getIntegers } from '../../../../utils/helpers';
import { type PlayerFormData, PlayerSchema } from './validation';

interface Props {
  onSubmit: (data: PlayerFormData) => void;
  defaultValues: PlayerFormData;
  countryOptions: ISelectOptions[];
  seasonOptions: ISelectOptions[];
  loading: boolean;
  error?: ApolloError;
}

export default function PlayerForm({
  onSubmit,
  defaultValues,
  countryOptions,
  seasonOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control } = useForm<PlayerFormData>({
    defaultValues: defaultValues as PlayerFormData,
    resolver: zodResolver(PlayerSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="name" label="Name" />
      <ControlledSelectInput
        control={control}
        name="nationality"
        label="Nationality"
        options={countryOptions}
      />
      <ControlledDateInput control={control} name="dateOfBirth" label="Date of Birth" />
      <ControlledDateInput control={control} name="yearJoined" label="Year Joined" view="year" />
      <ControlledSelectInput
        control={control}
        name="position"
        label="Position"
        options={positionOptions}
      />
      <ControlledSelectInput
        control={control}
        name="squadNumber"
        label="Squad Number"
        options={getIntegers(99)}
      />
      <ControlledMultiSelectInput
        control={control}
        name="seasonIds"
        options={seasonOptions}
        label="Seasons Played"
      />
      <ControlledSwitchInput control={control} name="isCaptain" label="Is player team captain?" />
      <ControlledSwitchInput
        control={control}
        name="isViceCaptain"
        label="Is player vice captain?"
      />
      <ControlledSwitchInput
        control={control}
        name="isHallOfFame"
        label="Is player in the hall of fame?"
      />
      <ControlledTextInput control={control} name="description" label="Description" />
    </FormContainer>
  );
}
