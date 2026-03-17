import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ControlledTextInput, CustomButton, FormContainer } from '../../../../../components';
import { CustomStack } from '../../../../../components/grids';
import { FormModal } from '../../../../../components/modals';
import { TApolloError } from '../../../../../types/apollo';
import { SetAdminAccessCodeData, SetAdminAccessCodeSchema } from './validation';

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  onSubmit: (data: SetAdminAccessCodeData) => void;
  defaultValues: SetAdminAccessCodeData;
  loading: boolean;
  error?: TApolloError;
}

export default function SetAdminAccessCodeForm({
  onSubmit,
  open,
  setOpen,
  defaultValues,
  loading,
  error,
}: Props) {
  const { handleSubmit, control } = useForm<SetAdminAccessCodeData>({
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
        <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
          <ControlledTextInput control={control} name="accessCode" label="Access Code" />
        </FormContainer>
      </FormModal>
    </CustomStack>
  );
}
