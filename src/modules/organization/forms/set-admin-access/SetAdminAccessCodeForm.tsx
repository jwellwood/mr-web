import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledTextInput, CustomButton, FormContainer } from '../../../../components';
import { CustomStack } from '../../../../components/grids';
import { FormModal } from '../../../../components/modals';
import { SetAdminAccessCodeData, SetAdminAccessCodeSchema } from './schema';

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
  const { t } = useTranslation('organization');
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
          {t('BUTTONS.SET_ADMIN_ACCESS_CODE')}
        </CustomButton>
      }
      <FormModal
        open={open}
        onClose={() => setOpen(false)}
        title={t('BUTTONS.SET_ADMIN_ACCESS_CODE')}
      >
        <FormContainer
          onSubmit={handleSubmit(onSubmit)}
          onReset={() => reset(defaultValues)}
          submitBtn={{ disabled: !isDirty || !isValid }}
          loading={loading}
        >
          <ControlledTextInput
            control={control}
            name="accessCode"
            label={t('FORMS.ADMIN_ACCESS_CODE')}
          />
        </FormContainer>
      </FormModal>
    </CustomStack>
  );
}
