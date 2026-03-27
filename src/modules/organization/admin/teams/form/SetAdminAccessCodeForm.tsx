import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ControlledTextInput, CustomButton, FormContainer } from '../../../../../components';
import { CustomStack } from '../../../../../components/grids';
import { FormModal } from '../../../../../components/modals';
import { SetAdminAccessCodeData, SetAdminAccessCodeSchema } from './validation';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: SetAdminAccessCodeData) => void;
  defaultValues: SetAdminAccessCodeData;
  loading: boolean;
}

export default function SetAdminAccessCodeForm({
  onSubmit,
  open,
  setOpen,
  defaultValues,
  loading,
}: Props) {
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<SetAdminAccessCodeData>({
    defaultValues,
    resolver: zodResolver(SetAdminAccessCodeSchema),
    mode: 'onChange',
  });

  return (
    <CustomStack>
      {
        <CustomButton color="tertiary" onClick={() => setOpen(true)}>
          Set Admin Access Code
        </CustomButton>
      }
      <FormModal open={open} onClose={() => setOpen(false)} title="Set Admin Access Code">
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset(defaultValues)}
          submitBtn={{ disabled: !isDirty || !isValid }}
          loading={loading}
        >
          <ControlledTextInput control={control} name="accessCode" label="Access Code" />
        </FormContainer>
      </FormModal>
    </CustomStack>
  );
}
