import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledTextInput } from '../../../../components';
import { RequestAccessData, RequestAccessSchema, requiredFields } from './schema';

interface Props {
  onSubmit: (data: RequestAccessData) => void;
  defaultValues: RequestAccessData;
  loading: boolean;
}

export default function RequestAccessForm({ onSubmit, defaultValues, loading }: Props) {
  const { t } = useTranslation('organization');
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<RequestAccessData>({
    defaultValues,
    resolver: zodResolver(RequestAccessSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ disabled: !isValid }}
      onReset={() => reset(defaultValues)}
      loading={loading}
      formSummary={t('FORM.REQUEST_ACCESS.SUMMARY')}
    >
      <ControlledTextInput
        control={control}
        name="accessCode"
        label={t('FORM.LABELS.ADMIN_ACCESS_CODE')}
        required={requiredFields.accessCode}
      />
    </FormContainer>
  );
}
