import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormContainer,
  ControlledTextInput,
  ControlledDateInput,
  ControlledSelectInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { TApolloError } from '../../../../types/apollo';
import { OrganizationSchema, type OrganizationFormData } from './schema';

interface Props {
  onSubmit: (data: OrganizationFormData) => void;
  defaultValues: OrganizationFormData;
  countryOptions: ISelectOptions[];
  loading: boolean;
  error?: TApolloError;
}

export default function OrgForm({
  onSubmit,
  defaultValues,
  countryOptions,
  loading,
  error,
}: Props) {
  const { t } = useTranslation('organization');
  const {
    handleSubmit,
    control,
    formState: { isDirty, isValid },
    reset,
  } = useForm<OrganizationFormData>({
    defaultValues,
    resolver: zodResolver(OrganizationSchema),
    mode: 'onChange',
  });
  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset(defaultValues)}
      submitBtn={{ disabled: !isValid || !isDirty }}
      loading={loading}
      error={error}
    >
      <ControlledTextInput control={control} name="name" label={t('FORMS.NAME')} />
      <ControlledTextInput control={control} name="website" label={t('FORMS.WEBSITE')} />
      <ControlledDateInput
        control={control}
        name="yearFounded"
        label={t('FORMS.YEAR_FOUNDED')}
        view="year"
      />
      <ControlledTextInput control={control} name="city" label={t('FORMS.CITY')} />
      <ControlledSelectInput
        control={control}
        name="country"
        label={t('FORMS.COUNTRY')}
        options={countryOptions}
      />
    </FormContainer>
  );
}
