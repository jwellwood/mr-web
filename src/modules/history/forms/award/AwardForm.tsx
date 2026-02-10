import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledTextInput,
  ControlledMultiSelectInput,
  type ISelectOptions,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { AwardSchema, type AwardFormData } from './validation';

interface Props {
  onSubmit: (data: AwardFormData) => void;
  defaultValues: AwardFormData;
  playersOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}
export default function AwardForm({
  onSubmit,
  defaultValues,
  playersOptions,
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
    </FormContainer>
  );
}
