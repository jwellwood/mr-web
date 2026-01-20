import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import {
  FormContainer,
  ControlledSelectInput,
  ControlledTextInput,
  ControlledSwitchInput,
  type ISelectOptions,
  ControlledDateInput,
} from '../../../../components';
import { DeleteModal } from '../../../../components/modals';
import { TrophySchema, type TrophyFormData } from './validation';

interface Props {
  onSubmit: (data: TrophyFormData) => void;
  defaultValues: TrophyFormData;
  seasonOptions: ISelectOptions[];
  onDelete?: () => void;
  loading: boolean;
  error?: ApolloError;
}

export default function TrophyForm({
  onSubmit,
  defaultValues,
  seasonOptions,
  onDelete,
  loading,
  error,
}: Props) {
  const { handleSubmit, control, watch } = useForm<TrophyFormData>({
    defaultValues,
    resolver: zodResolver(TrophySchema),
    mode: 'onChange',
  });

  const isFinal = watch('isFinal');

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="name" label="Name" />
      <ControlledSelectInput
        control={control}
        name="seasonId"
        label="Season"
        options={seasonOptions}
      />
      <ControlledDateInput control={control} name="year" label="Year" view="year" />
      <ControlledSwitchInput control={control} label="Is Winner?" name="isWinner" />
      <ControlledSwitchInput control={control} label="Is a final?" name="isFinal" />
      {isFinal && <ControlledTextInput control={control} name="opponent" label="Opponent" />}
      <ControlledTextInput control={control} name="comment" label="Comment" multiline />
      {onDelete && <DeleteModal onDelete={onDelete} title="Trophy" loading={loading} />}
    </FormContainer>
  );
}
