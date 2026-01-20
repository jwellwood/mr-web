import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError } from '@apollo/client';

import { FormContainer, ControlledTextInput } from '../../../components';
import { SearchFormData, SearchFormSchema } from './validation';

interface Props {
  defaultValues: { teamName: string };
  onSubmit: (data: SearchFormData) => void;
  loading: boolean;
  error?: ApolloError;
}

export default function SearchForm({ defaultValues, onSubmit, loading, error }: Props) {
  const { handleSubmit, control } = useForm<SearchFormData>({
    defaultValues,
    resolver: zodResolver(SearchFormSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      submitBtn={{ text: 'Search' }}
      loading={loading}
      error={error}
      height="109px"
    >
      <ControlledTextInput control={control} name="teamName" label="Team Name" />
    </FormContainer>
  );
}
