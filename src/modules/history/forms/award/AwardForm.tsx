import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  FormContainer,
  ControlledTextInput,
  ControlledMultiSelectInput,
  type ISelectOptions,
} from '../../../../components';
import DeleteModal from '../../../../components/modals/DeleteModal';
import { AwardSchema, type AwardFormData } from './validation';
import { ApolloError } from '@apollo/client';

interface Props {
  onSubmit: (data: AwardFormData) => void;
  defaultValues: AwardFormData;
  playersOptions: ISelectOptions[];
  onDelete?: () => void;
  loading: boolean;
  error?: ApolloError;
}
export default function AwardForm({
  onSubmit,
  defaultValues,
  playersOptions,
  onDelete,
  loading,
  error,
}: Props) {
  const { handleSubmit, control } = useForm<AwardFormData>({
    defaultValues,
    resolver: zodResolver(AwardSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput
        control={control}
        name="awardName"
        label="Award Name"
        placeholder="e.g. Player of the Season"
      />
      <ControlledMultiSelectInput
        control={control}
        name="winners"
        label="Winners"
        options={playersOptions}
        showLabels
      />
      <ControlledTextInput control={control} name="awardValue" label="Value" />
      <ControlledTextInput control={control} name="comment" label="Comment" />
      {onDelete && <DeleteModal onDelete={onDelete} title="Award" loading={loading} />}
    </FormContainer>
  );
}
