import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import {
  FormContainer,
  ControlledTextInput,
  ControlledDateInput,
  ControlledSelectInput,
} from '../../../../components';
import type { ISelectOptions } from '../../../../components';
import { OrganizationSchema, type OrganizationFormData } from './validation';

interface Props {
  onSubmit: (data: OrganizationFormData) => void;
  defaultValues: OrganizationFormData;
  countryOptions: ISelectOptions[];
  loading: boolean;
  error?: ApolloError;
}

export default function OrgForm({
  onSubmit,
  defaultValues,
  countryOptions,
  loading,
  error,
}: Props) {
  const { handleSubmit, control } = useForm<OrganizationFormData>({
    defaultValues,
    resolver: zodResolver(OrganizationSchema),
    mode: 'onChange',
  });
  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)} loading={loading} error={error}>
      <ControlledTextInput control={control} name="name" label="Organization Name" />
      <ControlledTextInput control={control} name="website" label="Website" />
      <ControlledDateInput control={control} name="yearFounded" label="Year Founded" view="year" />
      <ControlledTextInput control={control} name="city" label="City" />
      <ControlledSelectInput
        control={control}
        name="country"
        label="Country"
        options={countryOptions}
      />
    </FormContainer>
  );
}
