import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { FormContainer, ControlledTextInput } from '../../../../components';
import type { DeleteAccountFormData } from './validation';
import { DeleteAccountSchema } from './validation';

interface Props {
  onSubmit: (data: DeleteAccountFormData) => void;
  defaultValues: DeleteAccountFormData;
  username: string;
  loading: boolean;
}

export default function DeleteAccountForm({ onSubmit, defaultValues, username, loading }: Props) {
  const { handleSubmit, control, watch } = useForm<DeleteAccountFormData>({
    defaultValues,
    resolver: zodResolver(DeleteAccountSchema),
    mode: 'onChange',
  });

  const candidateName = watch('username');

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ disabled: candidateName !== username }}
      loading={loading}
    >
      <ControlledTextInput control={control} name="username" label="Username" />
    </FormContainer>
  );
}
