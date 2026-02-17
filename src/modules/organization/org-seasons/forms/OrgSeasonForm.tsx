import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  ControlledDateInput,
  ControlledTextInput,
  ControlledSwitchInput,
} from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { OrgSeasonSchema, type OrgSeasonFormData } from './validation';

interface Props {
  onSubmit: (formData: OrgSeasonFormData) => void;
  defaultValues: OrgSeasonFormData;
  loading: boolean;
  error?: TApolloError;
}

export default function OrgSeasonForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { handleSubmit, control } = useForm<OrgSeasonFormData>({
    defaultValues,
    resolver: zodResolver(OrgSeasonSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledDateInput control={control} name="yearStarted" label="Year Started" view="year" />
      <ControlledDateInput
        control={control}
        name="yearEnded"
        label="Year Ended"
        view="year"
        disableFuture={false}
      />
      <ControlledSwitchInput control={control} name="isCurrent" label="Is current season?" />
      <ControlledTextInput multiline control={control} name="comment" label="Comment" />
    </FormContainer>
  );
}
