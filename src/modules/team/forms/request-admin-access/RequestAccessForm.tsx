import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { RequestAccessData, RequestAccessSchema } from './validation';

interface Props {
  onSubmit: (data: RequestAccessData) => void;
  defaultValues: RequestAccessData;
  loading: boolean;
  error?: TApolloError;
}

export default function RequestAccessForm({ onSubmit, defaultValues, loading, error }: Props) {
  const { handleSubmit, control } = useForm<RequestAccessData>({
    defaultValues,
    resolver: zodResolver(RequestAccessSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="accessCode" label="Access Code" />
    </FormContainer>
  );
}
