import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormContainer, ControlledTextInput } from '../../../../components';
import type { ChangePasswordFormData } from './validation';
import { ChangePasswordSchema } from './validation';

interface Props {
  onSubmit: (data: ChangePasswordFormData) => void;
  defaultValues: ChangePasswordFormData;
  loading: boolean;
}

export default function EditPasswordForm({ onSubmit, defaultValues, loading }: Props) {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isValid },
    clearErrors,
  } = useForm<ChangePasswordFormData>({
    defaultValues,
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      loading={loading}
      submitBtn={{ disabled: !isDirty || !isValid, confirm: { show: false } }}
      onReset={() => {
        reset(defaultValues);
        clearErrors();
      }}
    >
      <ControlledTextInput
        control={control}
        name="password"
        label="Current Password"
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="newPassword"
        label="New Password"
        isPassword={true}
      />
      <ControlledTextInput
        control={control}
        name="confirmPassword"
        isPassword={true}
        label="Confirm New Password"
      />
    </FormContainer>
  );
}
