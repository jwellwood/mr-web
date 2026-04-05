import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormContainer, ControlledTextInput } from '../../../components';
import { TApolloError } from '../../../types/apollo';
import { SearchFormData, SearchFormSchema } from './schema';

interface Props {
  defaultValues: { teamName: string };
  onSubmit: (data: SearchFormData) => void;
  loading: boolean;
  error?: TApolloError;
  type?: 'team' | 'org';
}

export default function SearchForm({ defaultValues, onSubmit, loading, error, type }: Props) {
  const { t } = useTranslation('home');
  const {
    handleSubmit,
    control,
    formState: { isValid },
    reset,
  } = useForm<SearchFormData>({
    defaultValues,
    resolver: zodResolver(SearchFormSchema),
    mode: 'onChange',
  });

  return (
    <FormContainer
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset({ teamName: '' })}
      submitBtn={{ text: t('SEARCH.BUTTON'), disabled: !isValid, confirm: { show: false } }}
      loading={loading}
      error={error}
      minWidth={200} // 300 is too wide for mobile, 200 makes it use 100%
    >
      <ControlledTextInput
        control={control}
        name="teamName"
        label={type === 'org' ? t('LABELS.ORG_NAME') : t('LABELS.TEAM_NAME')}
      />
    </FormContainer>
  );
}
